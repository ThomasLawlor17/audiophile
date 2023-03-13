// React and React Router
import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// npm Packages
import styled from 'styled-components'

// Other files
import { AppContext } from "../App.provider";
import { srConfig } from "../config";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import sr from "../utils/sr";
import Icon from "./icons/Icon";



const StyledSection = styled.section`
${({theme}) => theme.mixins.flexCenter};
margin-top: 200px;
gap: 30px;
padding: 0 11.45%;

a {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 15px;
	flex-direction: column;
	background-color: var(--gray);
	width: 100%;
	height: 204px;
	border-radius: 8px;

	&:hover {
		div span {
			color: var(--orange);
			opacity: 1;
		}
	}

	img {
		position: absolute;
		width: 252.3px;
		top: -106.7px;
	}

	div {
		${({theme}) => theme.mixins.flexCenter}
		gap: 12px;
		padding-bottom: 30px;

		span {
			color: var(--black);
			opacity: 50%;
			font-size: 13px;
			line-height: 17.76px;
			letter-spacing: 1px;
		}

		svg {
			width: 8px;
			height: 12px;
			color: var(--orange);

		}
	}

}
@media (max-width: 769px) {
	gap: 10px;
	padding: 0 5%;
	margin-top: 148px;

	a {
		gap: 17px;
		height: 165px;

		img {
			width: 164px;
			top: -58px;
		}
		h6 {
			font-size: 15px;
			line-height: 20.49px;
			letter-spacing: 1.07px;
		}
	}
}

@media (max-width: 414px) {
	flex-direction: column;
	gap: 68px;
	padding: 0 24px;
	margin-top: 92px;

	a {
		height: 165px;

		div {
			padding-bottom: 22px;

		}
	}
}
`

const Categories = () => {
    const {categories} = useContext(AppContext)
	const revealContainer = useRef(null)
	const prefersReducedMotion = usePrefersReducedMotion()
  
	useEffect(() => {
	  if (prefersReducedMotion) {
		return
	  }
	  sr.reveal(revealContainer.current, srConfig())
	}, [prefersReducedMotion])


	return (
		<StyledSection id="categories" ref={revealContainer}>
			{categories.map((c, i) => (
				<Link key={i} to={`/${c}`}>
					<img src={process.env.PUBLIC_URL + `/assets/images/shared/desktop/image-category-thumbnail-${c}.png`} alt={c} />
					<h6>{c}</h6>
					<div>
						<span>SHOP</span><Icon name='arrow'/>
					</div>
				</Link>
			))}
		</StyledSection>
	);
};

export default Categories;
