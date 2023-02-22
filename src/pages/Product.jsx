import React from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
	return (
		<div>
            <h1>Product Page</h1>
			<Link to="/">Home</Link>
			<Link to="/headphones">headphones</Link>
			<Link to="/speakers">speakers</Link>
			<Link to="/earphones">earphones</Link>
			<Link to="/checkout">checkout</Link>
		</div>
	);
};

export default ProductPage;
