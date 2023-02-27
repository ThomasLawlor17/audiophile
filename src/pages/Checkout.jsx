import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App.provider";

const CheckoutPage = () => {
	const {user, cart, checkoutCart} = useContext(AppContext)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState()
	const [address, setAddress] = useState('')
	const [code, setCode] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [pmtType, setPmtType] = useState(0)

	const handleCheckout = e => {
		e.preventDefault()
		const billing = {
			name: name,
			email: email,
			phone: phone,
		}
		const shipping = {
			address: address,
			code: code,
			city: city,
			country: country
		}
		checkoutCart(user, pmtType, billing, shipping)
	  }

	return (
		<div>
            <h1>Checkout</h1>
			<Link to="/">Home</Link>
			<Link to="/headphones">headphones</Link>
			<Link to="/speakers">speakers</Link>
			<Link to="/earphones">earphones</Link>
			<Link to="/checkout">checkout</Link>
			<form onSubmit={(e) => handleCheckout(e)}>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
				<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
				<input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
				<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
				<input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
				<input type="radio" name="pmtType"  value={1} onChange={e => setPmtType(e.target.value)}/>
				<input type="radio" name="pmtType" value={2} onChange={e => setPmtType(e.target.value)}/>
				<button>CHECKOUT</button>
      	</form>
		</div>
	);
};

export default CheckoutPage;
