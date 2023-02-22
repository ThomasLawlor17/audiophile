import React from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
	return (
		<div>
            <h1>Checkout</h1>
			<Link to="/">Home</Link>
			<Link to="/headphones">headphones</Link>
			<Link to="/speakers">speakers</Link>
			<Link to="/earphones">earphones</Link>
			<Link to="/checkout">checkout</Link>
		</div>
	);
};

export default CheckoutPage;
