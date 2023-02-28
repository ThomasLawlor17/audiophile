import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App.provider'
import Icon from './icons/Icon'

const Nav = () => {
    const {categories} = useContext(AppContext)
  return (
    <nav>
        <div className="hb">
            <Icon name='hb'/>
        </div>
        <Link to='/'><h1>audiophile</h1></Link>
        <div className="links">
            <Link to='/'>HOME</Link>
            {categories.map((c, i) => <Link to={`/${c}`} key={i}>{c}</Link>)}
        </div>
        <div className="cart">
            <Icon name='cart'/>
        </div>
    </nav>
  )
}

export default Nav