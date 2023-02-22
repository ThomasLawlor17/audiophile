import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CategoryPage = () => {

  const location = useLocation()

  const [content] = useState([
    {name: 'Headphones', products: [1, 2, 3]},
    {name: 'Speakers', products: [1, 2, 3]},
    {name: 'Earphones', products: [1, 2, 3]},
  ])

  const [category, setCategory] = useState()

  useEffect(() => {
  if (location.pathname === '/headphones') {
    setCategory(content[0])
  }
  if (location.pathname === '/speakers') {
    setCategory(content[1])
  }
  if (location.pathname === '/earphones') {
    setCategory(content[2])
  }
  }, [location, content])

	return (
		<div location={location}>
      <h1>{category ? category.name : ''}</h1>
			<Link to="/">Home</Link>
			<Link to="/headphones">headphones</Link>
			<Link to="/speakers">speakers</Link>
			<Link to="/earphones">earphones</Link>
			<Link to="/checkout">checkout</Link>

      {category ? category.products.map((p, i) => (
        <Link to={`${location.pathname}/${p}`} key={i}>Product {p}</Link>
      )) : ''}
		</div>
	);
};

export default CategoryPage;
