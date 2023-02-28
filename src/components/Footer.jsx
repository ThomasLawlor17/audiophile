import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App.provider'
import Icon from './icons/Icon'

const Footer = () => {
    const {categories} = useContext(AppContext)

  return (
    <footer>
        <div className="top">
            <h2>audiophile</h2>
            <div className="links">
                <Link to='/'>HOME</Link>
                {categories.map((c, i) => (<Link to={`/${c}`} key={i + 100}>{c}</Link>))}
            </div>
        </div>
        <div className="middle">
            <p>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
                and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
                visit our demo facility - we’re open 7 days a week.
            </p>
            <div className="socials">
                <Icon name='facebook'/>
                <Icon name='twitter'/>
                <Icon name='instagram'/>
            </div>
        </div>
        <div className="bottom">
            <p>Copyright 2021. All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer