import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App.provider";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Nav from "../components/Nav";

const CategoryPage = () => {
  const {categories, products} = useContext(AppContext)
  const location = useLocation()

  const [activeCat, setActiveCat] = useState()
  const [activeProducts, setActiveProducts] = useState([])


  const filterProducts = (cat) => {
    let arr = []
    products.forEach((p) => {
      if (p.category === location.pathname.substring(1)) {
        arr.push(p)
      }
    })
    setActiveProducts(arr)
  }

  useEffect(() => {
    setActiveCat(location.pathname.substring(1))
    filterProducts(location.pathname)
    console.log(activeProducts)
  }, [location])



	return (
    <>
    <Nav/>
		<div>
      <h1>{activeCat}</h1>
      <div className="products">
        {activeProducts ? activeProducts.map((p, i) => (
          <div key={i} className={`product-item ${p.slug}-item`}>
            <Link to={`/${activeCat}/${p.id}`}>SEE PRODUCT</Link>
          </div>
        )): ''}
      </div>
      <Categories/>
      <Info/>
		</div>
    <Footer/>
    </>

	);
};

export default CategoryPage;
