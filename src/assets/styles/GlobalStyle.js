import { createGlobalStyle } from 'styled-components'
import background from '../images/background.svg'

const GlobalStyle = createGlobalStyle`    
    *,
    *:before,
    *:after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif !important;
        background: url(${ background });
        background-size: cover;
        background-repeat: no-repeat;
    }
`

export default GlobalStyle