import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getData}  from "./firebase/firebase";


function App() {

  const [products, setProducts] = useState()

  const fetchProducts = async() => {
    let data = await getData('products')
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()

  }, [])


  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Link to='/headphones'>headphones</Link>
      <Link to='/speakers'>speakers</Link>
      <Link to='/earphones'>earphones</Link>
      <Link to='/checkout'>checkout</Link>
      {products && products.map((p, i) => (
        <ul key={p.id}>
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
