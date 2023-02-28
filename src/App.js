import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore'
import { getProducts } from "./firebase/firebase";
import { AppContext } from "./App.provider";
import { getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Categories from "./components/Categories";


function App() {
  const {user, categories, products, fetchCart, addToCart, removeFromCart, checkoutCart} = useContext(AppContext)

  return (
    <>
    <Nav/>
    <div className="App">
      <div className="hero">
        <Link to='/headphones/4'>SEE PRODUCT</Link>
      </div>
      <Categories/>
      <div className="products">
        <div>
          <Link to='/speakers/6'>SEE PRODUCT</Link>
        </div>
        <div>
          <Link to='/speakers/5'>SEE PRODUCT</Link>
        </div>
        <div>
          <Link to='/earphones/1'>SEE PRODUCT</Link>
        </div>
      </div>
      <Info/>
    </div>
    <Footer/>
    </>
      
  );
}

export default App;
