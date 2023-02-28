import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App.provider";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Nav from "../components/Nav";

const ProductPage = () => {
	const {products}  = useContext(AppContext)
	const location = useLocation()
	const id = useParams()
	const navigate = useNavigate()
	const [activeProduct, setActiveProduct] = useState()

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
			{activeProduct.name}
			</div>
			: ''}
		<Categories/>
		<Info/>
		</div>
		<Footer/>
		</>
	);
};

export default ProductPage;
