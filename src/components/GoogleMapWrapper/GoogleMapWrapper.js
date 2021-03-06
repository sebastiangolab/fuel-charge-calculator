import React, { useCallback, useRef, useContext, useState, useEffect } from 'react'
import { use100vh } from 'react-div-100vh'
import styled from 'styled-components'

import { GoogleMap, Marker } from '@react-google-maps/api'
import GoogleMapLoad from '../GoogleMapLoad/GoogleMapLoad'
import GoogleMapSearchForm from '../GoogleMapSearchForm/GoogleMapSearchForm'
import CloseMapButton from '../Buttons/CloseMapButton/CloseMapButton'

import { ModalContext } from '../Modal/Modal'

const zoomMap = 10

const centerMap = {
    lat: 52.22738770234014,
    lng: 21.009001719362278,
}

const mapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: false,
    draggable: true,
    zoomControl: false,
}

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colors.white};
`

const MapComponentsContainer = styled.div`

    @media (max-width: ${({theme}) => theme.rwdSizes.bigPhone}) {
        & {
            width: 100vw;
            height: ${props => props.height100vh}px;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
`

const GoogleMapWrapper = ({ setInputAdressObject }) => {

    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: '90vw',
        height: '90vh',
        zIndex: '1',
    })

    const getWindowWidth = () => {
        const { innerWidth: width} = window;
        return width
    }

    const setMapStyles = width => {
        if (width > 991) {
            setMapContainerStyle({
                width: '90vw',
                height: '90vh',
                zIndex: '1',
            })
        } else if (width <= 991 && width > 768) {
            setMapContainerStyle({
                width: '95vw',
                height: '95vh',
                zIndex: '1',
            })
        } else if ( width <= 768) {
            setMapContainerStyle({
                width: '100vw',
                height: '100vh',
                zIndex: '1',
            })
        } 
    }
      
    useEffect(() => {
        const width = getWindowWidth()
        setMapStyles(width)

        const handleResize = () => {
            const width = getWindowWidth()
            setMapStyles(width)
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { hideModal } = useContext(ModalContext)
    const [MarkerCoords, setMarkerCoords] = useState(null)

    const mapRef = useRef()
    const onMapLoad = useCallback(map => {
        mapRef.current = map
    }, [])

    const mapPanTo = (lat, lng) => {
        if (lat === null || lng === null) {
            setMarkerCoords(null)
            return null
        }

        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(15)
        setMarkerCoords({ lat, lng })
    }

    const height100vh = use100vh()
    
    return (
        <Wrapper>
            <GoogleMapLoad>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={centerMap}
                    zoom={zoomMap}
                    options={mapOptions}
                    onLoad={onMapLoad}
                >   
                    {MarkerCoords !== null &&
                        <Marker 
                            position={{lat: MarkerCoords.lat, lng: MarkerCoords.lng}}
                        />
                    }
                </GoogleMap>
                <MapComponentsContainer height100vh={height100vh}>
                    <CloseMapButton onClick={hideModal} />
                    <GoogleMapSearchForm mapPanTo={mapPanTo} setInputAdressObject={setInputAdressObject} />
                </MapComponentsContainer>
            </GoogleMapLoad>
        </Wrapper>
    )
}

export default GoogleMapWrapper 