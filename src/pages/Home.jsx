import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App.provider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import GlobalStyle from "./styles/GlobalStyle";
import {ThemeProvider} from 'styled-components'
import theme from "./styles/theme";
import styled from 'styled-components'
import About from "./components/About";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";
import sr from "./utils/sr";
import { srConfig } from "./config";

const StyledHeroSection = styled.section`
height: 100vh;
max-height: 768px;
width: 100vw;
top: 0;
background-color: #191919;


&::before {
  content: '';
  width: 100vw;
  height: 100vh;
  max-height: 768px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${({background}) => background}) center/cover no-repeat;
}

&::after {
  content: '';
  position: absolute;
  width: 77.0883333333%;
  height: 1px;
  background-color: var(--white);
  opacity: 20%;
  margin: auto;
  top: var(--nav-height);
  left: 0;
  right: 0;
}

div.text {
  position: relative;
  left: 11.5%;
  top: 29.296875%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 27.638889%;
  max-width: 398px;
  height: 45.052083%;
  max-height: 346px;

  span, h1, p {
    color: var(--white);
  }
  span.overline {
    opacity: 50%;
  }
  p {
    width: 87.7%;
    opacity: 75%;
  }
  a {
    ${({theme}) => theme.mixins.buttonOne}
    margin-top: 16px;
  }
}
@media (max-width: 769px) {
  max-height: 729px;
  ${({theme}) => theme.mixins.flexCenter};
  
  &::before {
    max-height: 729px;
    opacity: 50.21%;
  }
  &::after {
    width: 89.5833333333%;
  }

  div.text {
    left: auto;
    top: 50px;
    width: 379px;
    height: 346px;
    align-items: center;
    text-align: center;

    p {
      width: calc(100% - 30px);
    }
  }
}
@media (max-width: 414px) {
  max-height: 600px;
  
  &::before {
    max-height: 600px;
  }
  &::after {
    width: 100%;
  }

  div.text {
    width: 328px;
    height: 290px;
    a {
      margin-top: 4px;
    }
  }
}
`
const StyledProductsSection = styled.section`
display: flex;
flex-direction: column;
padding: 0 11.45%;
gap: 48px;
margin: 168px 0 200px 0;

div.product1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  background-color: var(--orange);
  color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  height: 560px;

  svg {
    position: absolute;
    margin: auto;
    top: -36px;
    width: 944px;
    height: 944px;
    @media (min-width: 770px) {
      left: -149px;
    }
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  svg.scale {
    scale: 1.6;
  }
  

  img {
    position: absolute;
    margin: auto;
    width: 385px;
    height: 483px;
    left: 10.541%;
    top: 96px;
  }
  div.text {
    ${({theme}) => theme.mixins.flexCenter};
    flex-direction: column;
    z-index: 2;
    @media (min-width: 770px) {
      align-items: flex-start;
      margin-right: 8.558558559%;
      @media (max-width: 1200px) {
        margin-right: 3%;
      }
      @media (max-width: 1100px) {
        margin-right: 0;
      }
    }
    gap: 24px;
    width: 349px;
    h1 {
      color: var(--white);
    }
    a {
      ${({theme}) => theme.mixins.buttonThree};
      margin-top: 16px;
    }
  }
}
div.product2 {
  background: url(${({product2Image}) => product2Image}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  border-radius: 8px;
  height: 320px;
  a {
    ${({theme}) => theme.mixins.buttonTwo};
  }
  h4, a {
    margin-left: 95px;
  }
}
div.product3 {
  display: flex;
  gap: 30px;

  img, div {
    border-radius: 8px;
    width: 50%;
  }
  img {
    object-fit: cover;
  }
  div {
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;

    h4, a {
      margin-left: 95px;
    }

    a {
      ${({theme}) => theme.mixins.buttonTwo};
    }
  }
}
@media (max-width: 1000px) {
  div.product1 {
    height: 720px;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    gap: 24px;

    svg {
      top: -288px;
      left: auto;
    }
    img {
      left: 0;
      right: 0;
      top: 52px;
      width: 197.21px;
      height: 237px;
    }
    div.text {
      margin-bottom: 64px;
      width: 349px;
      text-align: center;
      align-items: center;
    }
  }
}
@media (max-width: 769px) {
  padding: 0 40px;
  gap: 32px;
  margin: 96px 0;

  div.product2 {
    h4, a {
      margin-left: 62px;
    }
  }
  div.product3 {
    gap: 11px;
    height: 320px;

    @media (min-width: 415px) {
      h4, a {
        margin-left: 41px;
      }
    }
  }
}
@media (max-width: 414px) {
  padding: 0 24px;
  gap: 24px;
  margin: 120px 0;

  div.product1 {
    height: 600px;

    svg {
      width: 560px;
      height: 560px;
      top: -121px;
    }

    img {
      top: 55px;
      width: 172.25px;
      height: 207px;
    }
    div.text {
      margin-bottom: 55px;
      width: 280px;
      a {
        margin-top: 0;
      }
    }
  }
  div.product2 {
    h4, a {
      margin-left: 24px;
    }
  }
  div.product3 {
    flex-direction: column;
    gap: 24px;
    height: 424px;

    img, div {
      width: 100%;
    }

    div {
      height: 200px;
      
      h4, a {
        margin-left: 24px;
      }
    }
  }
}

`

function App() {
  const {width} = useContext(AppContext)

  const [linkHovering, setLinkHovering] = useState(false)
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }
    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])


  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle/>
    <>
    <Nav/>
    <main>
      <StyledHeroSection className="hero" background={process.env.PUBLIC_URL + `/assets/images/home/${width >= 770 ? 'desktop/image-hero.jpg' : width < 770 && width > 414 ? 'tablet/image-header.jpg' : 'mobile/image-header.jpg'}`}>
        <div className="text">
          <span className="overline">NEW PRODUCT</span>
          <h1>XX99 Mark II Headphones</h1>
          <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
          <Link to='/headphones/xx99-mark-two-headphones'>SEE PRODUCT</Link>
        </div>
      </StyledHeroSection>
      <Categories/>
      <StyledProductsSection product2Image={process.env.PUBLIC_URL + `/assets/images/home/${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}/image-speaker-zx7.jpg`}>
        <div className="product1" ref={revealContainer}>
          <svg viewBox="0 0 944 944" className={linkHovering ? 'scale' : ''}><g stroke="#FFF" fill="none" fillRule="evenodd" opacity=".202"><circle cx="472" cy="472" r="235.5"></circle><circle cx="472" cy="472" r="270.5"></circle><circle cx="472" cy="472" r="471.5"></circle></g></svg>
          <img src={process.env.PUBLIC_URL + `/assets/images/home/${width > 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}/image-speaker-zx9.png`} alt="" />
          <div className="text">
            <h1>ZX9<br/>SPEAKER</h1>
            <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Link to='/speakers/zx9-speaker' onMouseEnter={() => setLinkHovering(true)} onMouseLeave={() => setLinkHovering(false)}>SEE PRODUCT</Link>
          </div>
        </div>
        <div className="product2" ref={revealContainer}>
          <h4>ZX7 SPEAKER</h4>
          <Link to='/speakers/zx7-speaker'>SEE PRODUCT</Link>
        </div>
        <div className="product3" ref={revealContainer}>
          <img src={process.env.PUBLIC_URL + `/assets/images/home/${width > 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}/image-earphones-yx1.jpg`} alt="" />
          <div className="title">
            <h4>YX1 EARPHONES</h4>
            <Link to='/earphones/yx1-earphones'>SEE PRODUCT</Link>
          </div>
        </div>
      </StyledProductsSection>
      <About/>
    </main>
    <Footer/>
    </>
    </ThemeProvider>
  );
}

export default App;
