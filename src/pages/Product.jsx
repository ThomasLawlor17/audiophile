import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled, {ThemeProvider} from 'styled-components'
import { AppContext } from "../App.provider";
import About from "../components/About";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/theme";


const StyledMain = styled.main`
padding: calc(79px + var(--nav-height)) 11.45% 0 11.45%;
display: flex;
flex-direction: column;
> p {
	opacity: 50%;
	margin-bottom: 56px; 
	width: fit-content;
	cursor: pointer;

	&:hover {
		opacity: 1;
		color: var(--orange);
	}
}

section:nth-of-type(2) {
	margin-top: 240px;
	padding: 0;
}
section:nth-of-type(3) {
	padding: 0;
	margin: 160px 0;
}

section.product {
	display: flex;
	flex-direction: column;
	gap: 160px;
	width: 100%;

	.main {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.main-img {
			border-radius: 8px;
			width: 48.64864865%;
		}
		.main-info {
			display: flex;
			flex-direction: column;
			gap: 16px;
			@media (min-width: 770px) {
				width: 40.13513514%;

				p {
					margin: 16px 0;
				}
				h6 {
					margin-bottom: 31px;
				}
			}

			.cart-options {
				display: flex;
				justify-content: flex-start;
				gap: 16px;
	
				.item-qty {
					${({theme}) => theme.mixins.flexCenter};
					gap: 20px;
					height: 48px;
					padding: 0 15.5px;
					background-color: var(--gray);
					span {
						width: 16px;
						text-align: center;
						font-size: 13px;
						line-height: 17.76px;
						letter-spacing: 1px;
					}
		
					span.add, span.reduce {
						opacity: 50%;
						cursor: pointer;
		
						&:hover {
							opacity: 1;
							color: var(--orange);
						}
					}
				}
				div.add-to-cart {
					${({theme}) => theme.mixins.buttonOne};
					cursor: pointer;
				}
			}
		}
	}
	.specs {
		display: grid;
		grid-template-columns: 57.20720721% 31.53153153%;
		.features {
			display: flex;
			flex-direction: column;
			gap: 32px;
			h3 {
				margin-bottom: 8px;
			}
		}
		.includes {
			display: flex;
			flex-direction: column;
			gap: 32px;
			@media (min-width: 770px) {
				margin-left: auto;
			}
			ul {
				display: flex;
				flex-direction: column;
				gap: 8px;
				margin: 0;
				padding: 0;
				list-style: none;
	
				li {
					display: flex;
					align-items: center;
					gap: 24px;
	
					span {
						font-size: 15px;
						line-height: 25px;
					}
	
					span.includes-item-qty {
						color: var(--orange);
						width: 15px;
					}
					span.includes-item-name {
						opacity: 50%;
					}
				}
	
			}
		}
	}

	.gallery {
		display: grid;
		grid-template-rows: 1fr 1fr;
		row-gap: 32px;
		column-gap: 30px;

		img {
			border-radius: 8px;
			width: 100%;
			object-fit: cover;
			height: 100%;
		}
		.first-img {
			grid-area: 1 / 1 / 2 / 2;
		}
		.second-img {
			grid-area: 2 / 1 / 3 / 2;
		}
		.third-img {
			grid-area: 1 / 2 / 3 / 3;
		}
	}
	.others {
		${({theme}) => theme.mixins.flexCenter};
		flex-direction: column;
		gap: 64px;
		width: 100%;

		.other-items {
			${({theme}) => theme.mixins.flexCenter};
			gap: 30px;

			div {
				${({theme}) => theme.mixins.flexCenter};
				flex-direction: column;
				gap: 32px;

				img {
					border-radius: 8px;
					width: 100%;
				}
				h5 {
					margin-top: 8px;
				}

				a {
					${({theme}) => theme.mixins.buttonOne};
				}
			}
		}
	}
}


@media (max-width: 769px) {
	padding: calc(33px + var(--nav-height-tablet)) 40px 0 40px;

	section:nth-of-type(2) {
		margin-top: 172px;
	}
	section:nth-of-type(3) {
		margin: 120px 0;
	}

	section.product {
		display: flex;
		flex-direction: column;

		.main {
			.main-img {
				height: 480px;
				width: 281px;
			}
			.main-info {
				@media (min-width: 415px) {
					max-width: 340px;
				}
			}

		}
		.specs {
			display: flex;
			flex-direction: column;
			.features {
				gap: 32px;
			}
			.includes {
				display: grid;
				grid-template-columns: 1fr 1fr;
	
				ul {
					margin-right: auto;
				}
			}
		}
		.gallery {
			grid-template-columns: 40.144927564% 57.24637681%;
			row-gap: 20px;
			column-gap: 18px;
		}
		.others {
			gap: 56px;

			.other-items {
				gap: 11px;
			}
		}
	}
}
@media (max-width: 414px) {
	padding: calc(16px + var(--nav-height-tablet)) 24px 0 24px;
	gap: 24px;

	h3 {
		font-size: 24px;
		line-height: 36px;
		letter-spacing: 0.86px;
	}

	section.product {
		.main {
			flex-direction: column;
			justify-content: center;
			gap: 32px;
			.main-img {
				height: auto;
				width: 100%;
			}

			.main-info {
				gap: 24px;
				h2 {
					font-size: 28px;
					line-height: 38.25px;
					letter-spacing: 1px;
				}
		}

		}
		.specs {
			.featured h3 {
				margin-bottom: 0;
			}
			.includes {
				display: flex;
				flex-direction: column;
				gap: 24px;
			}
		}
		.gallery {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		.others {
			gap: 40px;

			.other-items {
				flex-direction: column;
				gap: 56px;

				div {
					gap: 32px;
				}
			}
		}
	}
}

`

const ProductPage = () => {
	const {width, user, products, addToCart, setCartOpen, splitProductName, getItemCategory}  = useContext(AppContext)
	const location = useLocation()
	const id = useParams()
	const navigate = useNavigate()
	const [activeProduct, setActiveProduct] = useState()
	const [qty, setQty] = useState(1)

	useEffect(() => {
		let product = products.find(product => product.slug === id.product)
		setActiveProduct(product)
	}, [location, id, products])

	const handleAddToCart = async () => {
		await addToCart(user, activeProduct.id, qty)
		setCartOpen(true)
		setTimeout(() => {
			setCartOpen(false)
		}, 2200)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle/>
		<>
		<Nav/>
		<StyledMain>
			<p className="back" onClick={() => navigate(-1)}>Go Back</p>
			{activeProduct ? 
			<section className="product">
				<div className="main">
					<img className="main-img" src={process.env.PUBLIC_URL + activeProduct.image[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={activeProduct.name} />
					<div className="main-info">
						{activeProduct.new ? <span className="overline">NEW PRODUCT</span> : ''}
						{splitProductName(activeProduct.name, activeProduct.category)}
						<p>{activeProduct.description}</p>
						<h6>${activeProduct.price.toLocaleString('en-US')}</h6>
						<div className="cart-options">
							<div className="item-qty">
								<span className="reduce" onClick={() => setQty(qty => qty === 1 ? qty : qty - 1)}>-</span>
								<span className="qty">{qty}</span>
								<span className="add" onClick={() => setQty(qty => qty + 1)}>+</span>
							</div>
							<div className="add-to-cart" onClick={handleAddToCart}>ADD TO CART</div>
						</div>
					</div>
				</div>
				<div className="specs">
				<div className="features">
					<h3>FEATURES</h3>
					{activeProduct.features.map((feature, i) => <p key={i}>{feature}</p>)}
				</div>
				<div className="includes">
					<h3>IN THE BOX</h3>
					<ul>
					{activeProduct.includes.map((item, i) => <li key={i}><span className="includes-item-qty">{item.quantity}x</span><span className="includes-item-name">{item.item}</span></li>)}
					</ul>
				</div>
				</div>
				<div className="gallery">
					<img className="first-img" src={process.env.PUBLIC_URL + activeProduct.gallery.first[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={`${activeProduct.name} gallery image 1`} />
					<img className="second-img" src={process.env.PUBLIC_URL + activeProduct.gallery.second[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={`${activeProduct.name} gallery image 2`} />
					<img className="third-img" src={process.env.PUBLIC_URL + activeProduct.gallery.third[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={`${activeProduct.name} gallery image 3`} />
				</div>
				<div className="others">
					<h3>YOU MAY ALSO LIKE</h3>
					<div className="other-items">
					{activeProduct.others.map((item, i) => (
						<div key={i}>
							<img src={item.image[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={item.name} />
							<h5>{item.name}</h5>
							<Link to={`/${getItemCategory(item.slug)}/${item.slug}`}>SEE PRODUCT</Link>
						</div>
					))}
					</div>
				</div>
			</section>
			: ''}
		<Categories className='categories'/>
		<About/>
		</StyledMain>
		<Footer/>
		</>
		</ThemeProvider>
	);
};

export default ProductPage;
