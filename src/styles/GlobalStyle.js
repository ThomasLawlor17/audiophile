import {createGlobalStyle} from 'styled-components'
import variables from './variables'

const GlobalStyle = createGlobalStyle`
${variables};

html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--dark-gray);
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }
  :focus-visible {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 12px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--dark-gray);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--light-gray);
    color: var(--black);
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
  }
  #root {
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }




  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 700;
    color: var(--black);
    text-transform: uppercase;
  }
  h1 {
    font-size: 56px;
    line-height: 58px;
    letter-spacing: 2px;
  }
  h2 {
    font-size: 40px;
    line-height: 44px;
    letter-spacing: 1.5px;
  }
  h3 {
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 1.15px;
  }
  h4 {
    font-size: 28px;
    line-height: 38px;
    letter-spacing: 2px;
  }
  h5 {
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 1.7px;
  }
  h6 {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1.3px;
  }
  span.overline,
  subtitle {
    margin: 0;
    color: var(--orange);
    text-transform: uppercase;
  }
  span.overline {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 10px;
  }
  subtitle {
    font-weight: 700;
    font-size: 13px;
    line-height: 25px;
    letter-spacing: 1px;
  }
  p {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    line-height: 25px;
  }

  @media (max-width: 414px) {
    h1 {
      font-size: 36px;
      line-height: 40px;
      letter-spacing: 1.29px;
    }
  }

  a {
    text-decoration: none;
  }

  @keyframes fade {
    from {opacity: 0}
    to {opacity: 1}
  }

`

export default GlobalStyle