import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore'
import { getProducts } from "./firebase/firebase";
import { AppContext } from "./App.provider";
import { getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth'


function App() {
  const {user, products, fetchCart, addToCart, removeFromCart} = useContext(AppContext)


  return (
    <div className="App">
      <div>USER: {user}</div>
      <Link to='/'>Home</Link>
      <Link to='/headphones'>headphones</Link>
      <Link to='/speakers'>speakers</Link>
      <Link to='/earphones'>earphones</Link>
      <Link to='/checkout'>checkout</Link>
      <button onClick={() => fetchCart()}>FETCH CART</button>
      {products && products.map((p, i) => (
        <ul key={p.id}>
                <button onClick={() => addToCart(user, p.id, 1)} >Add to cart</button>
                <button onClick={() => removeFromCart(user, p.id, 1)}>Remove</button>
                <li>{p.id}</li>
          <li>{p.name}</li>
          <li>{p.category}</li>
          <li>{p.price}</li>
          <li>{p.includes.map((includes, i) => (
            <ul key={i}>
              <li>{includes.item}</li>
              <li>{includes.quantity}</li>
            </ul>
          ))}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
