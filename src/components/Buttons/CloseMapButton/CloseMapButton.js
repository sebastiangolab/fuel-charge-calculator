import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({theme}) => theme.sizes.desktop.medium};
    color: ${({theme}) => theme.colors.white};
    background-color: ${({theme}) => theme.colors.blue};
    z-index: 10;
    border: none;
    box-shadow: none;
    transition: background-color 0.3s;
    cursor: pointer;
    border-radius: 0;
    line-height: 1;

    &:hover {
        background-color: ${({theme}) => theme.colors.blueHover};
    }

    &:focus {
        outline: none;
    }

    @media (max-width: ${({theme}) => theme.rwdSizes.tablet}) {
        & {
            width: 50px;
            height: 50px;
        }
    }

    @media (max-width: ${({theme}) => theme.rwdSizes.bigPhone}) {
        & {
            display: none;
        }
    }
        
`

const CloseMapButton = props => <Wrapper {...props}>X</Wrapper>

export default CloseMapButton