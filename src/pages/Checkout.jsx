import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App.provider";
import Footer from "../components/Footer";
import Icon from "../components/icons/Icon";
import Nav from "../components/Nav";

const CheckoutPage = () => {
	const {user, cart, checkoutCart} = useContext(AppContext)
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState()
	const [address, setAddress] = useState('')
	const [code, setCode] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [pmtType, setPmtType] = useState(0)
	const [emNo, setEmNo] = useState('')
	const [emPin, setEmPin] = useState('')

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
		const payment = {
			pmtType: pmtType,
			emNo: pmtType === 1 ? emNo : '',
			emPin: pmtType === 1 ? emPin : '',
		}
		checkoutCart(user, payment, billing, shipping)
	}

	return (
		<>
		<Nav/>
		<div>
			<div className="back" onClick={() => navigate(-1)}>Go Back</div>
			<div>
			<div className="form">
				<h1>CHECKOUT</h1>
				<form onSubmit={(e) => handleCheckout(e)}>
					<h6>BILLING DETAILS</h6>
					<label htmlFor="">Name</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
					<label htmlFor="">Email Address</label>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="">Phone Number</label>
					<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					<h6>SHIPPING INFO</h6>
					<label htmlFor="">Address</label>
					<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
					<label htmlFor="">ZIP Code</label>
					<input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
					<label htmlFor="">City</label>
					<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
					<label htmlFor="">Country</label>
					<input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
					<h6>PAYMENT DETAILS</h6>
					<label htmlFor="">Payment Method</label>
					<input type="radio" name="pmtType"  value={1} onChange={e => setPmtType(e.target.value)}/>
					<input type="radio" name="pmtType" value={2} onChange={e => setPmtType(e.target.value)}/>
					<div className="payment">
						{pmtType === '1' ?
							<>
							<label htmlFor="">e-Money Number</label>
							<input type="text" value={emNo} onChange={(e) => setEmNo(e.target.value)}/>
							<label htmlFor="">e-Money PIN</label>
							<input type="text" value={emPin} onChange={(e) => setEmPin(e.target.value)}/>
							</>
						: pmtType === '2' ? 
							<>
							<div>
								<Icon name='cod'/>
							</div>
							<p>  
								The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives 
								at your residence. Just make sure your address is correct so that your order will not be cancelled.
							</p>
							</>
						: ''}
					</div>
      			</form>
			</div>
			<div className="summary">
				<h3>SUMMARY</h3>
				<div className="cart">
					{cart && cart.length ? cart.map((p, i) => (
						<div key={i}>{p.name}</div>
					)) : ''}
					<ul className="costs">
						<li><span>TOTAL</span><span>${cart && cart.length ? cart.map(p => p.qty * p.price).reduce((a, b) => a + b) : 0}</span></li>
						<li><span>SHIPPING</span><span>${cart && cart.length ? 50 : 0}</span></li>
						<li><span>VAT (INCLUDED)</span><span>${cart && cart.length ? cart.map(p => p.qty * p.price).reduce((a, b) => a + b) * 0.2 : 0}</span></li>
						<li><span>GRAND TOTAL</span><span>${cart && cart.length ? cart.map(p => p.qty * p.price).reduce((a, b) => a + b) + 50 : 0}</span></li>
					</ul>
					<div className="checkout" onClick={handleCheckout}>CHECKOUT</div>
				</div>
			</div>
			</div>
		</div>
		<Footer/>
		</>
	);
};

export default CheckoutPage;
