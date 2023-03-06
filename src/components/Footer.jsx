import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App.provider'
import Icon from './icons/Icon'
import styled from 'styled-components'

const StyledFooter = styled.footer`
position: relative;
display: grid;
grid-template-columns: 1fr 1fr;
background-color: var(--dark-gray);
color: var(--white);
padding: 75px 11.45% 48px 11.45%;
row-gap: 32px;

&::before {
    content: '';
    width: 101px;
    height: 4px;
    background-color: var(--orange);
    position: absolute;
    top: 0;
    left: 11.45%;
}
#logo {
    width: 143px;
    height: 25px;
    grid-area: 1 / 1 / 2 / 2;
}
.links {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 34px;
    grid-area: 1 / 2 / 2 / 3;
    a {
        color: var(--white);
        text-transform: uppercase;
        font-size: 13px;
        line-height: 25px;
        letter-spacing: 2px;

        &:hover {
            color: var(--orange);
        }
    }
}
p.text {
    opacity: 50%;
    grid-area: 2 / 1 / 3 / 2;
}
p.copyright {
    margin-top: 48px;
    opacity: 50%;
    grid-area: 3 / 1 / 4 / 2;
}
div.socials {
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    align-items: end;
    justify-content: flex-end;
    gap: 16px;
    svg {
        width: 24px;
        height: 24px;
        color: var(--white);
        cursor: pointer;

        &:hover {
            color: var(--orange);
        }
    }
}
@media (max-width: 769px) {
    padding: 60px 5.208% 46px 5.208%;

    &::before {
        left: 5.208%;
    }
    #logo {
        grid-area: 1 / 1 / 2 / 3;
    }
    .links {
        grid-area: 2 / 1 / 3 / 3;
        justify-content: flex-start;
    }
    p.text {
        grid-area: 3 / 1 / 4 / 3;
    }
    p.copyright {
        grid-area: 4 / 1 / 5 / 2;
    }
    div.socials {
        grid-area: 4 / 2 / 5 / 3;
    }
}
@media (max-width: 414px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    text-align: center;

    &::before {
        left: 0;
        right: 0;
        margin: auto;
    }
    .links {
        flex-direction: column;
        gap: 16px;
    }
    p.copyright {
        margin: 0;
    }
}
`

const Footer = () => {
    const {categories} = useContext(AppContext)

  return (
    <StyledFooter>
        <Icon name='logo'/>
            <div className="links">
                <Link to='/'>HOME</Link>
                {categories.map((c, i) => (<Link to={`/${c}`} key={i + 100}>{c}</Link>))}
            </div>
            <p className='text'>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
                and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
                visit our demo facility - we’re open 7 days a week.
            </p>
            <p className='copyright'>Copyright 2021. All Rights Reserved</p>
            <div className="socials">
                <Icon name='facebook'/>
                <Icon name='twitter'/>
                <Icon name='instagram'/>
            </div>
    </StyledFooter>
  )
}

export default Footer