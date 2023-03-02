import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App.provider";
import About from "../components/About";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const ProductPage = () => {
	const {user, products, addToCart}  = useContext(AppContext)
	const location = useLocation()
	const id = useParams()
	const navigate = useNavigate()
	const [activeProduct, setActiveProduct] = useState()
	const [qty, setQty] = useState(1)

	useEffect(() => {
		setActiveProduct(products[id.product - 1])
	}, [location, id, products])

	return (
		<>
		<Nav/>
		<div>
			<div className="back" onClick={() => navigate(-1)}>Go Back</div>
			{activeProduct ? 
			<div className="product">
			<h1>{activeProduct.name}</h1>
			<div className="qty">{qty}</div>
			<div className="add" onClick={() => addToCart(user, activeProduct.id, qty)}>ADD TO CART</div>
			</div>
			: ''}
		<Categories/>
		<About/>
		</div>
		<Footer/>
		</>
	);
};

export default ProductPage;
