import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App.provider";
import Footer from "../components/Footer";
import Icon from "../components/icons/Icon";
import Nav from "../components/Nav";
import styled, {ThemeProvider} from 'styled-components'
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";

const StyledMain = styled.main`
padding: calc(79px + var(--nav-height)) 11.45% 0 11.45%;
margin-bottom: 141px;
.back {
	opacity: 50%;
	margin-bottom: 56px; 
	width: fit-content;
	cursor: pointer;

	&:hover {
		opacity: 1;
		color: var(--orange);
	}
}
.container {
	display: flex;
	justify-content: space-between;
	&:has(.cart-empty-message) {
		justify-content: center;
	}
}
.backdrop {
	position: absolute;
	z-index: 5;
	width: 100%;
	height: 10000px;
	top: 0;
	left: 0;
	backdrop-filter: brightness(0.4);
}

@media (max-width: 1000px) {
	.container {
		flex-direction: column;
		gap: 32px;
		margin-bottom: 116px;
	}
}

@media (max-width: 769px) {
	padding: calc(48px + var(--nav-height-tablet)) 40px 0 40px;
	margin-bottom: 116px;

	.back {
		margin-bottom: 24px;
	}
}
@media (max-width: 414px) {
	padding: calc(16px + var(--nav-height-tablet)) 24px 0 24px;
	margin-bottom: 97px;

	.back {
		margin-bottom: 24px;
	}
	.container {
		margin-bottom: 97px;
	}
}


`
const StyledFormSection = styled.section`
background-color: var(--white);
border-radius: 8px;
padding: 54px 48px 48px 48px;
display: flex;
flex-direction: column;
gap: 41px;
width: 65.76576577%;


ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;
	row-gap: 24px;
	li {
		display: flex;
		flex-direction: column;
		gap: 9px;

		&.full {
			grid-column: 1 / 3;
		}

		label {
			font-size: 12px;
			font-weight: 700;
			line-height: 16px;
			letter-spacing: -0.214286px;
		}

		input {
			border: 1px solid #CFCFCF;
			border-radius: 8px;
			font-size: 14px;
			font-weight: 700;
			line-height: 19px;
			letter-spacing: -0.25px;
			height: 54px;
			padding-left: 24px;

			&:is(:focus, :focus-visible, :focus-within) {
				outline: none;
				border-color: var(--orange);
			}
		}
	}
	@media (min-width: 415px) {
		&:not(.payment ul) {
			margin-top: 16px;
			&:first-of-type {
				margin-bottom: 53px;
			}
			&:nth-of-type(2) {
				margin-bottom: 61px;
			}
		}
	}
}

form {
	display: flex;
	flex-direction: column;
}

#emoney-input, #cash-input {
	display: none;
}
.emoney-input, .cash-input {
	border: 1px solid #CFCFCF;
	border-radius: 8px;
	font-size: 14px;
	line-height: 19px;
	letter-spacing: -0.25px;
	height: 54px;
	display: flex;
	align-items: center;
	position: relative;
	padding-left: 16px;
	gap: 16px;
	cursor: pointer;

	&::before {
		content: '';
		width: 20px;
		height: 20px;
		border: 1px solid #CFCFCF;
		border-radius: 100%;

	}

	&:hover {
		border-color: var(--orange);
	}
}
input[type='radio']:checked + label {
	&::after {
		content: '';
		border-radius: 100%;
		width: 10px;
		height: 10px;
		position: absolute;
		background-color: var(--orange);
		left: 21px;
	}
}
.pmt-label {
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: -0.214286px;
}
.pmt-method {
	display: grid;
	align-items: flex-start;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;
	margin: 16px 0 30px 0;

	.pmt-radio {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
}
.payment {
	display: flex;
	gap: 32px;
	svg {
		color: var(--orange);
		width: 48px;
		height: 48px;
	}
	p {
		opacity: 50%;
	}
	ul {
		width: 100%;
	}
}
@media (max-width: 1000px) {
	width: 100%;
}

@media (max-width: 769px) {
	padding: 30px 27px;
}
@media (max-width: 414px) {
	padding: 24px;
	gap: 32px;

	h3 {
		font-size: 28px;
		line-height: 38.25px;
		letter-spacing: 1px;
	}
	ul {
		display: flex;
		flex-direction: column;
	}
	form {
		gap: 16px;
		ul {
			gap: 24px;
			margin-bottom: 16px;
		}
		.pmt-method {
			display: flex;
			flex-direction: column;
			gap: 16px;
			margin-bottom: 0;

			.pmt-radio {
				width: 100%;
			}
		}


		.payment {
			margin-top: 16px;
			flex-direction: column;

			ul li {
				gap: 9px;
			}
		}
	}
}
`
const StyledSummarySection = styled.section`
padding: 32px 33px;
background-color: var(--white);
border-radius: 8px;
height: fit-content;
display: flex;
flex-direction: column;
gap: 31px;
min-width: 31.531531531%;

ul {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;
	li {
		display: flex;
		justify-content: space-between;
		span:first-of-type {
			font-size: 15px;
			font-weight: 500;
			line-height: 25px;
			opacity: 50%;
		}
		span:last-of-type {
			font-size: 18px;
			line-height: 24.59px;
		}
		&.grand-total {
			margin-top: 16px;
			span:last-of-type {
				color: var(-orange);
			}
		}
	}
}
.cart {
	display: flex;
	flex-direction: column;
	gap: 24px;
	.cart-item {
		display: flex;
        align-items: center;

        .cart-item-img {
            width: 64px;
            img {
                border-radius: 8px;
                width: 64px;
                height: 64px;
            }
        }
        .cart-item-info {
            display: flex;
            flex-direction: column;
            text-transform: uppercase;
            margin-left: 16px;

			p {
				font-weight: 700;
			}

            .cart-item-price {
				font-size: 14px;
                opacity: 50%;
            }
        }
        .cart-item-qty {
			opacity: 50%;
			margin-left: auto;
			font-weight: 700;
        }
    }
}
.checkout {
	${({theme}) => theme.mixins.buttonOne};
	cursor: pointer;
	width: auto;
}


@media (max-width: 769px) {

}
@media (max-width: 414px) {
	padding: 32px 24px;

}`

const StyledEmptySection = styled.section`
display: flex;
align-items: center;
justify-content: flex-start;
margin-top: 2rem;
flex-direction: column;
gap: 32px;
height: calc(50vh - var(--nav-height));
text-align: center;
margin: auto;

a {
	${({theme}) => theme.mixins.buttonOne};
}
`

const StyledCheckoutDiv = styled.div`
position: absolute;
margin: auto;
left: 0;
right: 0;
top: calc(var(--nav-height) + 59px);
background-color: var(--white);
border-radius: 8px;
display: flex;
flex-direction: column;
gap: 24px;
z-index: 10;
padding: 48px;
width: 540px;

.icon-background {
	position: relative;
	width: 64px;
	height: 64px;
	background-color: var(--orange);
	border-radius: 100%;
	margin-bottom: 9px;

	svg {
		fill: var(--white);
		width: 25px;
		height: 17px;
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
}
> p {
	opacity: 50%;
}
.order-summary {
	border-radius: 8px;
	display: flex;
	overflow: hidden;
	margin: 9px 0 24px 0;

	.cart-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
		background-color: var(--gray);
		width: 55.405405405%;
		padding: 24px;

		.cart-item {
			display: flex;
			align-items: flex-start;
			img {
				width: 50px;
				height: 50px;
			}
			.cart-item-info {
				display: flex;
				flex-direction: column;
				text-transform: uppercase;
				margin-left: 16px;
	
				p {
					font-weight: 700;
				}
	
				.cart-item-price {
					font-size: 14px;
					opacity: 50%;
				}
			}
			.cart-item-qty {
				opacity: 50%;
				margin-left: auto;
				font-weight: 700;
			}
		}
	}
	.other-items-expand {
		position: relative;
		text-align: center;
		padding-top: 12px;
		cursor: pointer;
		&::before {
			content: '';
			position: absolute;
			background-color: var(--black);
			opacity: 8%;
			height: 1px;
			width: 80.48780488%;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
		}

		span {
			font-size: 12px;
			line-height: 16.39px;
			letter-spacing: -0.21px;
			opacity: 50%;
		}
	}
	.summary-total {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 8px;
		color: var(--white);
		background-color: var(--black);
		width: 44.594594594%;
		p {
			opacity: 50%;
		}
		span, p {
			bottom: 0;
			margin-left: 33px;
		}
		span {
			margin-bottom: 40px;
		}
	}
}
a {
	${({theme}) => theme.mixins.buttonOne};
	width: 100%;
}
@media (max-width: 550px) {
	padding: 24px;
	width: 414px;
}
@media (max-width: 414px) {
	width: 87.2%;
	padding: 32px;

	h3 {
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.86px;
	}
	.order-summary {
		flex-direction: column;
		.cart-content, .summary-total {
			width: 100%;
		}
		.summary-total {
			p, span {
				margin-left: 24px;
			}
			p {
				margin-top: 15px;
			}
			span {
				margin-bottom: 19px;
			}
		}
	}
}
`


const CheckoutPage = () => {
	const {user, cart, checkoutCart, checkedOut, setCheckedOut, checkoutSummary, getItemCategory} = useContext(AppContext)
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
	const [errFormat, setErrFormat] = useState([])
	const [errEmpty, setErrEmpty] = useState([])
	const [expandSummary, setExpandSummary] = useState(false)

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
		<ThemeProvider theme={theme}>
			<GlobalStyle/>
		<>
		<Nav/>
		<StyledMain>
			<div className="back" onClick={() => navigate(-1)}>Go Back</div>
			<div className="container">
				{cart && cart.length ?
				<>
				<StyledFormSection className="form">
					<h3>CHECKOUT</h3>
					<form onSubmit={(e) => handleCheckout(e)}>
						<subtitle>BILLING DETAILS</subtitle>
						<ul className="billing">
							<li className={errEmpty.includes('name') || errFormat.includes('name') ? 'error' : ''}>
								<label htmlFor="">Name{errEmpty.includes('name') ? <span>Can't be empty</span> : errFormat.includes('name') ? <span>Wrong format</span> : ''}</label>
								<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
							</li>
							<li className={errEmpty.includes('email') || errFormat.includes('email') ? 'error' : ''}>
								<label htmlFor="">Email Address{errEmpty.includes('email') ? <span>Can't be empty</span> : errFormat.includes('email') ? <span>Wrong format</span> : ''}</label>
								<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</li>
							<li className={errEmpty.includes('phone') || errFormat.includes('phone') ? 'error' : ''}>
								<label htmlFor="">Phone Number{errEmpty.includes('phone') ? <span>Can't be empty</span> : errFormat.includes('phone') ? <span>Wrong format</span> : ''}</label>
								<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
							</li>
						</ul>
						<subtitle>SHIPPING INFO</subtitle>
						<ul className="shipping">
							<li className={errEmpty.includes('address') || errFormat.includes('address') ? 'error full' : 'full'}>
								<label htmlFor="">Address{errEmpty.includes('address') ? <span>Can't be empty</span> : errFormat.includes('address') ? <span>Wrong format</span> : ''}</label>
								<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
							</li>
							<li className={errEmpty.includes('code') || errFormat.includes('code') ? 'error' : ''}>
								<label htmlFor="">ZIP Code{errEmpty.includes('code') ? <span>Can't be empty</span> : errFormat.includes('code') ? <span>Wrong format</span> : ''}</label>
								<input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
							</li>
							<li className={errEmpty.includes('city') || errFormat.includes('city') ? 'error' : ''}>
								<label htmlFor="">City{errEmpty.includes('city') ? <span>Can't be empty</span> : errFormat.includes('city') ? <span>Wrong format</span> : ''}</label>
								<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
							</li>
							<li className={errEmpty.includes('country') || errFormat.includes('country') ? 'error' : ''}>
								<label htmlFor="">Country{errEmpty.includes('country') ? <span>Can't be empty</span> : errFormat.includes('country') ? <span>Wrong format</span> : ''}</label>
								<input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
							</li>
						</ul>
						<subtitle>PAYMENT DETAILS</subtitle>
						<div className="pmt-method">
							<span className="pmt-label">Payment Method</span>
							<div className="pmt-radio">
								<input type="radio" name="pmtType" id="emoney-input"  value={1} onChange={e => setPmtType(e.target.value)}/>
								<label className="emoney-input" htmlFor="emoney-input">e-Money</label>
								<input type="radio" name="pmtType" id="cash-input" value={2} onChange={e => setPmtType(e.target.value)}/>
								<label className="cash-input" htmlFor="cash-input">Cash on Delivery</label>
							</div>
						</div>
						<div className="payment">
							{pmtType === '1' ?
								<ul>
									<li className={errEmpty.includes('emNo') || errFormat.includes('emNo') ? 'error' : ''}>
										<label htmlFor="">e-Money Number{errEmpty.includes('emNo') ? <span>Can't be empty</span> : errFormat.includes('emNo') ? <span>Wrong format</span> : ''}</label>
										<input type="text" value={emNo} onChange={(e) => setEmNo(e.target.value)}/>
									</li>
									<li className={errEmpty.includes('emPin') || errFormat.includes('emPin') ? 'error' : ''}>
										<label htmlFor="">e-Money PIN{errEmpty.includes('emPin') ? <span>Can't be empty</span> : errFormat.includes('emPin') ? <span>Wrong format</span> : ''}</label>
										<input type="text" value={emPin} onChange={(e) => setEmPin(e.target.value)}/>
									</li>
								</ul>
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
				</StyledFormSection>
				<StyledSummarySection>
					<h6>SUMMARY</h6>
					<div className="cart">
						{cart && cart.length ? cart.map((item, i) => (
							<div key={i} className='cart-item'>
								<Link to={`/${getItemCategory(item.slug)}/${item.slug}`} className="cart-item-img">
                       				<img src={process.env.PUBLIC_URL + `/assets/images/cart/image-${item.slug}.jpg`} alt={item.slug.replace(/-/g, ' ')} />
                    			</Link>
                    			<div className="cart-item-info">
                        			<p className='cart-item-name'>{item.slug.replace(/-/g, ' ').replace(/headphones/g, '').replace(/speakers/g, '').replace(/earphones/g, '').replace('one', 'I').replace('two', 'II').replace(/mark/g, 'mk')}</p>
                        			<p className='cart-item-price'>${item.price.toLocaleString('en-US')}</p>
                    			</div>
                    			<p className="cart-item-qty">x{item.qty}</p>
							</div>
						)) : ''}
						<ul className="costs">
							<li><span>TOTAL</span><span>${cart && cart.length ? cart.map(p => p.qty * p.price).reduce((a, b) => a + b) : 0}</span></li>
							<li><span>SHIPPING</span><span>${cart && cart.length ? 50 : 0}</span></li>
							<li><span>VAT (INCLUDED)</span><span>${cart && cart.length ? Math.round(cart.map(p => p.qty * p.price).reduce((a, b) => a + b) * 0.2) : 0}</span></li>
							<li className="grand-total"><span>GRAND TOTAL</span><span>${cart && cart.length ? cart.map(p => p.qty * p.price).reduce((a, b) => a + b) + 50 : 0}</span></li>
						</ul>
						<div className="checkout" onClick={handleCheckout}>{pmtType === 1 ? 'CONTINUE AND PAY' : 'CONTINUE'}</div>
					</div>
				</StyledSummarySection>
				</>
				:
				<StyledEmptySection className="cart-empty-message">
					<h3>Your cart is empty!</h3>
					<Link to='/'>GO BACK HOME</Link>
				</StyledEmptySection>
				}
			</div>
			{checkedOut ? 
			<>
			<StyledCheckoutDiv>
				<div className="icon-background">
					<Icon name='check'/>
				</div>
				<h3>THANK YOU <br/> FOR YOUR ORDER</h3>
				<p>You will receive an email confirmation shortly</p>
				<div className="order-summary">
					<div className="cart-content">
					{checkoutSummary.length > 1 && !expandSummary ?
					<>
					<div className='cart-item'>
						<img src={process.env.PUBLIC_URL + `/assets/images/cart/image-${checkoutSummary[0].slug}.jpg`} alt={checkoutSummary[0].slug.replace(/-/g, ' ')} />
						<div className="cart-item-info">
							<p className='cart-item-name'>{checkoutSummary[0].slug.replace(/-/g, ' ').replace(/headphones/g, '').replace(/speakers/g, '').replace(/earphones/g, '').replace('one', 'I').replace('two', 'II').replace(/mark/g, 'mk')}</p>
								<p className='cart-item-price'>${checkoutSummary[0].price.toLocaleString('en-US')}</p>
						</div>
							<p className="cart-item-qty">x{checkoutSummary[0].qty}</p>
					</div>					
					</>
					:
					checkoutSummary.map((item, i) => (
						<>
						<div key={i} className='cart-item'>
							<img src={process.env.PUBLIC_URL + `/assets/images/cart/image-${item.slug}.jpg`} alt={item.slug.replace(/-/g, ' ')} />
							<div className="cart-item-info">
								<p className='cart-item-name'>{item.slug.replace(/-/g, ' ').replace(/headphones/g, '').replace(/speakers/g, '').replace(/earphones/g, '').replace('one', 'I').replace('two', 'II').replace(/mark/g, 'mk')}</p>
								<p className='cart-item-price'>${item.price.toLocaleString('en-US')}</p>
							</div>
							<p className="cart-item-qty">x{item.qty}</p>
						</div>
						</>
					))
					}
					{checkoutSummary.length > 1 && expandSummary ? 
						<div className="other-items-expand" onClick={() => setExpandSummary(false)}>
							<span>View less</span>
						</div>
					: checkoutSummary.length > 1 && !expandSummary ?
						<div className="other-items-expand" onClick={() => setExpandSummary(true)}>
							<span>and {checkoutSummary.length - 1} other item{checkoutSummary.length > 2 ? 's' : ''}</span>
						</div>
					:
					''}
					</div>
					<div className="summary-total">
						<p>GRAND TOTAL</p>
						<span>${checkoutSummary.map(p => p.qty * p.price).reduce((a, b) => a + b) + 50}</span>
					</div>
				</div>
				<Link to='/' onClick={() => setCheckedOut(false)}>BACK TO HOME</Link>
			</StyledCheckoutDiv>
			<div className="backdrop"></div>
			</>
			:
			''
			}
		</StyledMain>
		<Footer/>
		</>
		</ThemeProvider>
	);
};

export default CheckoutPage;
