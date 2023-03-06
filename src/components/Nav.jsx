// React and React Router
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// npm packages
import styled, {css} from 'styled-components'

// Other files
import { AppContext } from '../App.provider'
import Icon from './icons/Icon'

// Hooks
import useScrollDirection from '../hooks/useScrollDirection'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import Categories from './Categories'

const StyledHeader = styled.header`
${({theme}) => theme.mixins.flexCenter};
position: fixed;
top: 0;
z-index: 11;
width: 100%;
height: var(--nav-height);
pointer-events: auto !important;
user-select: auto !important;
transition: var(--transition);
${props => props.location === '/' ? '' : css`background-color: var(--black);`}

@media (max-width: 769px) {
    height: var(--nav-height-tablet);       
}

@media (prefers-reduced-motion: no-preference) {
    ${props => props.scrollDirection === 'up' && !props.scrolledToTop && css`
    height: var(--nav-height);
    transform: translateY(0px);
    ${props => props.location === '/' ? css`background-color: #191919;` : css`background-color: var(--black);`}
    @media (max-width: 769px) {
    height: var(--nav-height-tablet);  
    }
    `};
    ${props => props.scrollDirection === 'down' && !props.scrolledToTop && css`
    height: var(--nav-height);
    transform: translateY(calc(var(--nav-height) * -1));
    @media (max-width: 769px) {
        height: var(--nav-height-tablet);
        transform: translateY(calc(var(--nav-height-tablet) * -1));   
    }
    
    `}
}
`
const StyledNav = styled.nav`
${({theme}) => theme.mixins.flexBetween};
position: relative;
width: 77%;
max-width: 1110px;

.hb, .tablet {
    display: none;
}
a:not(.logo-link) {
    color: var(--white);
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: 2px;
}
svg {
    color: var(--white);
}
.cart-icon {
    height: 20px;
    width: 23px;
    cursor: pointer;
}
#logo, .logo-link {
    height: 25px;
    width: 143px;
}
.links {
    ${({theme}) => theme.mixins.flexCenter};
    gap: 34px;

    a:hover {
        color: var(--orange);
    }
}

@media (max-width: 769px) {
    align-items: center;
    width: 89.58333333%;
    .tablet {
        ${({theme}) => theme.mixins.flexCenter};
        gap: 42px;
    }
    .hb, .hb svg {
        display: block;
        width: 16px;
        height: 15px;
        cursor: pointer;
    }
    .links {
        display: none;
    }
}
@media (max-width: 414px) {
}

`
const StyledMenu = styled.div`
position: fixed;
z-index: 10;
width: 100%;
top: 97px;
background-color: var(--white);
border-radius: 8px;
padding-bottom: 35px;
backdrop-filter: brightness(1);

section {
    margin-top: 108px;

    @media (max-width: 414px) {
        margin-top: 84px;
    }
}
`
const Backdrop = styled.div`
position: absolute;
z-index: 5;
width: 100%;
height: 10000px;
top: 0;
backdrop-filter: brightness(0.4);
`
const StyledCart = styled.div`
position: fixed;
top: calc(var(--nav-height) + 32px);
right: 11.45%;
backdrop-filter: brightness(1);
z-index: 11;
background-color: var(--white);
${({theme}) =>  theme.mixins.flexCenter};
flex-direction: column;
padding: 31px 32px;
border-radius: 8px;
gap: 24px;
width: 377px;

div {
    width: 100%;
}

.top, .contents, .cart-item, .total {
    display: flex;
}
.top {
    justify-content: space-between;
    margin-bottom: 8px;
    p {
        opacity: 50%;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
            color: var(--orange);
            opacity: 1;
        }
    }
}


.contents {
    flex-direction: column;
    margin-bottom: 8px;
    gap: 24px;

    .cart-item {
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

            .cart-item-price {
                opacity: 50%;
            }
        }
        .cart-item-qty {
            ${({theme}) => theme.mixins.flexCenter};
            gap: 12px;
            height: 32px;
            padding: 0 11.5px;
            background-color: var(--gray);
            margin-left: auto;
            span {
                font-size: 13px;
                font-weight: 700;
                line-height: 17.76px;
                letter-spacing: 1px;
                text-align: center;
                width: 16px;
            }
            .reduce, .add {
                opacity: 25%;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                    color: var(--orange);
                }
            }
        }
    }
    .total {
        justify-content: space-between;

        p {
            opacity: 50%;
        }
        span {
            font-size: 18px;
            line-height: 24.59px;
        }
    }
    .checkout {
        ${({theme}) => theme.mixins.buttonOne};
        width: 100%;
    }
}

@media (max-width: 769px) {
    top: calc(var(--nav-height-tablet) + 24px);
    right: 40px;
}


@media (max-width: 414px) {
    margin: 0 24px;
    width: calc(100% - 48px);
    padding: 31px 24px;
    right: auto;

    .contents {
        .cart-item {
            .cart-item-info {
            }
        }
    }


}
`

const Nav = () => {
    const {width, user, cart, addToCart, removeFromCart, cartOpen, setCartOpen, categories, checkedOut, getItemCategory} = useContext(AppContext)
    const scrollDirection = useScrollDirection('down')
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const prefersReducedMotion = usePrefersReducedMotion()
    const location = useLocation()

    const [active, setActive] = useState(false)

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50)
    }

    useEffect(() => {
        if (prefersReducedMotion) {
            return
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prefersReducedMotion])

  return (
    <>
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop} location={location.pathname}>
    <StyledNav>
        {width < 770 && width > 414 ? 
        <div className="tablet">
            <div className="hb" onClick={() => setActive(active => !active)}>
                <Icon name='hb'/>
            </div>
            <Link to='/' className='logo-link'><Icon name='logo'/></Link>
        </div>
        :
        <>
        <div className="hb" onClick={() => setActive(active => !active)}>
            <Icon name='hb'/>
        </div>
        <Link to='/' className='logo-link'><Icon name='logo'/></Link>
        </>
        }
        <div className="links">
            <Link to='/'>HOME</Link>
            {categories.map((c, i) => <Link to={`/${c}`} key={i}>{c}</Link>)}
        </div>
        <div className="cart" onClick={() => setCartOpen(cartOpen => !cartOpen)}>
            <Icon name='cart'/>
        </div>
    </StyledNav>
    </StyledHeader>
    {cartOpen ? 
    <>
    <Backdrop></Backdrop>
    <StyledCart>
        <div className="top">
            <h6>CART ({cart && cart.length && !checkedOut ? cart.length : '0'})</h6>
            <p onClick={!checkedOut ? () => removeFromCart(user, null, 'all') : null}>Remove all</p>
        </div>
        <div className="contents">
            {cart && cart.length && !checkedOut ? cart.map((item, i) => (
                <div key={i} className="cart-item">
                    <Link to={`/${getItemCategory(item.slug)}/${item.slug}`} className="cart-item-img">
                        <img src={process.env.PUBLIC_URL + `/assets/images/cart/image-${item.slug}.jpg`} alt={item.slug.replace(/-/g, ' ')} />
                    </Link>
                    <div className="cart-item-info">
                        <span className='cart-item-name'>{item.slug.replace(/-/g, ' ').replace(/headphones/g, '').replace(/speakers/g, '').replace(/earphones/g, '').replace('one', 'I').replace('two', 'II').replace(/mark/g, 'mk')}</span>
                        <span className='cart-item-price'>${item.price.toLocaleString('en-US')}</span>
                    </div>
                    <div className="cart-item-qty">
                        <span className="reduce" onClick={() => removeFromCart(user, item.id, 1)}>-</span>
                        <span className="qty">{item.qty}</span>
                        <span className="add" onClick={() => addToCart(user, item.id, 1)}>+</span>
                    </div>
                </div>
            )): <div className='empty'>YOUR CART IS EMPTY</div>}
            <div className="total">
                <p>TOTAL</p>
                <span>${cart && cart.length ? cart.map(item => item.qty * item.price).reduce((a, b) => a + b).toLocaleString('en-US') : '0'}</span>
            </div>
                <Link to='/checkout' className='checkout' onClick={() => setCartOpen(false)}>CHECKOUT</Link>
        </div>
    </StyledCart>
    </>
    : null}
    {width < 770 && active ? <><Backdrop></Backdrop><StyledMenu className="nav-menu"><Categories/></StyledMenu></> : null}
    </>
  )
}

export default Nav