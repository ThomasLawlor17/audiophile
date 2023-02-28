import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App.provider";

const Categories = () => {
    const {categories} = useContext(AppContext)


	return (
		<div>
			{categories.map((c, i) => (
				<div key={i}>
					<Link to={`/${c}`}>
						{c}
					</Link>
				</div>
			))}
		</div>
	);
};

export default Categories;
