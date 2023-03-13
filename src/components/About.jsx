import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { AppContext } from '../App.provider'
import { srConfig } from '../config'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import sr from '../utils/sr'

const StyledSection = styled.section`
${({theme}) => theme.mixins.flexCenter};
flex-direction: row-reverse;
padding: 0 11.45%;
gap: 125px;
margin-bottom: 200px;

img {
  border-radius: 8px;
}

div.text {
  ${({theme}) => theme.mixins.flexCenter};
  flex-direction: column;
  gap: 32px;
  h2 span {
    color: var(--orange);
  }
  p {
    opacity: 50%;
  }
}

@media (max-width: 769px) {
  flex-direction: column;
  gap: 63px;
  padding: 0 40px;
  margin-bottom: 96px;

  img {
    width: 100%;
  }

  div.text {
    text-align: center;
    padding: 0 58px;
  }

}
@media (max-width: 414px) {
  gap: 40px;
  padding: 0 24px;
  margin-bottom: 120px;

  div.text {
    padding: 0;
    h2 {
      font-size: 28px;
      line-height: 38.25px;
      letter-spacing: 1px;
    }
  }
}

`

const About = () => {
  const {width} = useContext(AppContext)
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }
    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])
  

  return (
    <StyledSection id='about' ref={revealContainer}>
      <img src={process.env.PUBLIC_URL + `/assets/images/shared/${width >= 770 ? 'desktop' : width < 770 & width > 414 ? 'tablet' : 'mobile'}/image-best-gear.jpg`} alt="" />
      <div className="text">
        <h2>BRINGING YOU THE <span>BEST</span> AUDIO GEAR</h2>
        <p>  
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
          earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
          rooms available for you to browse and experience a wide range of our products. Stop by our store 
          to meet some of the fantastic people who make Audiophile the best place to buy your portable 
          audio equipment.
        </p>
      </div>
    </StyledSection>
  )
}

export default About