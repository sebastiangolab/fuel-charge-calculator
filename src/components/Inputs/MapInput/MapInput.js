import React, { useState } from 'react'

import Modal from '../../Modal/Modal'
import InputWrapper from '../../../assets/styles/InputWrapper/InputWrapper'
import Label from '../../../assets/styles/Label/Label'
import Input from '../../../assets/styles/Input/Input'
import GoogleMapWrapper from '../../GoogleMapWrapper/GoogleMapWrapper'

const MapInput = ({ id, label, placeholder, placesValue, setPlacesValue }) => {

    const [ModalOpen, setModalOpen] = useState(false)
    const showModal = () => setModalOpen(true)
    const hideModal = () => setModalOpen(false)

    const [inputValue, setInputValue] = useState('')

    const setInputAdressObject = (adress, coords) => {
        setInputValue(adress)
        
        const updatedPlacesValue = placesValue.map(place => place.id === id ? {...place, adress, coords} : place)
        setPlacesValue(updatedPlacesValue)
    }

    const handleOnClick = () => showModal()

    return (
        <>
            <InputWrapper>
                <Label>{label}</Label>
                <Input 
                    type="text"
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={() => {}}
                    onClick={handleOnClick}
                />
            </InputWrapper>

            <Modal 
                hideModal={hideModal}
                isOpen={ModalOpen}
            >
                <GoogleMapWrapper setInputAdressObject={setInputAdressObject} />
            </Modal>
        </>
    )
}

export default MapInput