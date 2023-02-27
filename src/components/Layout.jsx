import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../App.provider'
import Loader from './Loader'
import Nav from './Nav'

const Layout = ({children}) => {
    const [isLoading, setIsLoading] = useState(isHome)


  return (
    <>

    <div id='content'>
        {children}
    </div>
    </>
  )
}

export default Layout