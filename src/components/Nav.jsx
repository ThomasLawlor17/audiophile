// React and React Router
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// npm packages
import styled, {css} from 'styled-components'

// Other files
import { AppContext } from '../App.provider'
import Icon from './icons/Icon'

// Hooks
import useScrollDirection from '../hooks/useScrollDirection'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import Categories from './Categories'

const StyledHeader = styled.header`
${({theme}) => theme.mixins.flexCenter};
position: fixed;
top: 0;
z-index: 11;
width: 100%;
height: var(--nav-height);
pointer-events: auto !important;
user-select: auto !important;
transition: var(--transition);

@media (prefers-reduced-motion: no-preference) {
    ${props => props.scrollDirection === 'up' && !props.scrolledToTop && css`
    height: var(--nav-height);
    transform: translateY(0px);
    background-color: #191919;`};
    ${props => props.scrollDirection === 'down' && !props.scrolledToTop && css`
    height: var(--nav-height);
    transform: translateY(calc(var(--nav-height) * -1))`}
}
`


const StyledNav = styled.nav`
${({theme}) => theme.mixins.flexBetween};
position: relative;
width: 77%;
max-width: 1110px;

.hb, .tablet {
    display: none;
}
a:not(.logo-link) {
    color: var(--white);
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: 2px;
}
svg {
    color: var(--white);
}
.cart-icon {
    height: 20px;
    width: 23px;
    cursor: pointer;
}
#logo, .logo-link {
    height: 25px;
    width: 143px;
}
.links {
    ${({theme}) => theme.mixins.flexCenter};
    gap: 34px;

    a:hover {
        color: var(--orange);
    }
}

@media (max-width: 769px) {
    align-items: center;
    .tablet {
        ${({theme}) => theme.mixins.flexCenter};
        gap: 42px;
    }
    .hb {
        display: block;
        width: 16px;
        height: 15px;
    }
    .links {
        display: none;
    }
}
@media (max-width: 414px) {
}

`

const Nav = () => {
    const {width, categories} = useContext(AppContext)
    const scrollDirection = useScrollDirection('down')
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const prefersReducedMotion = usePrefersReducedMotion()

    const [active, setActive] = useState(false)

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50)
    }

    useEffect(() => {
        if (prefersReducedMotion) {
            return
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

  return (
    <>
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
    <StyledNav>
        {width < 770 && width > 414 ? 
        <div className="tablet">
            <div className="hb" onClick={() => setActive(active => !active)}>
                <Icon name='hb'/>
            </div>
            <Link to='/' className='logo-link'><Icon name='logo'/></Link>
        </div>
        :
        <>
        <div className="hb" onClick={() => setActive(active => !active)}>
            <Icon name='hb'/>
        </div>
        <Link to='/' className='logo-link'><Icon name='logo'/></Link>
        </>
        }
        <div className="links">
            <Link to='/'>HOME</Link>
            {categories.map((c, i) => <Link to={`/${c}`} key={i}>{c}</Link>)}
        </div>
        <div className="cart">
            <Icon name='cart'/>
        </div>
    </StyledNav>
    </StyledHeader>
    {width < 770 && active ? <div className="nav-menu"><Categories/></div> : null}
    </>
  )
}

export default Nav