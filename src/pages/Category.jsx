import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, {ThemeProvider} from 'styled-components'

import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";

import { AppContext } from "../App.provider";
import About from "../components/About";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const StyledMain = styled.main`
section:nth-of-type(3) {
  margin: 240px 0 120px 0;
}
@media (max-width: 769px) {
  section:nth-of-type(3) {
    margin: 172px 0 120px 0;
  }
}

`
const StyledHeroSection = styled.section`
height: 336px;
padding-top: var(--nav-height);
background-color: var(--black);
display: flex;
justify-content: center;
align-items: flex-end;

&::after {
  content: '';
  position: absolute;
  top: var(--nav-height);
  width: 77.08333333%;
  height: 1px;
  background-color: var(--white);
  opacity: 20%;
}

h2 {
  color: var(--white);
  text-align: center;
  margin-bottom: 97px;
}

@media (max-width: 769px) {
  height: 336px;
  padding-top: var(--nav-height-tablet);

  &::after {
    top: var(--nav-height-tablet);
    width: 89.583333333%;
  }

}
@media (max-width: 414px) {
  height: 192px;
  padding-top: var(--nav-height-tablet);

  &::after {
    width: 100%;
  }

  h2 {
    font-size: 28px;
    line-height: 38.25px;
    letter-spacing: 2px;
    margin-bottom: 32px;
  }
}

`
const StyledProductsSection = styled.section`
${({theme}) => theme.mixins.flexCenter};
flex-direction: column;
gap: 160px;
padding: 0 11.45%;
margin-top: 160px;

.product-item, .product-item-text {
  ${({theme}) => theme.mixins.flexCenter};
}
.product-item {
  justify-content: space-between;
  gap: 11.26%;

  @media (min-width: 770px) {
    &:nth-of-type(2n) {
      flex-direction: row-reverse;
    }
  }

  img {
    width: 50%;
    border-radius: 8px;
  }

  .product-item-text {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    p {
      opacity: 50%;
      @media (min-width: 770px) {
        margin: 16px 0 24px 0;
      }
    }

    a {
      ${({theme}) => theme.mixins.buttonOne};
    }
  }
}


@media (max-width: 769px) {
  gap: 120px;
  padding: 0 40px;
  margin-top: 120px;

  .product-item {
    justify-content: center;
    flex-direction: column;
    gap: 52px;
    text-align: center;
    img {
      width: 100%;
    }
    .product-item-text {
      align-items: center;
      padding: 0 58px;

      @media (min-width: 415px) {
        p {
          margin: 16px 0 8px 0;
        }
      }
    }
  }
}
@media (max-width: 414px) {
  padding: 0 24px;
  margin-top: 64px;

  .product-item {
    gap: 32px;

    .product-item-text {
      gap: 24px;
      padding: 0;

      h2 {
        font-size: 28px;
        line-height: 38.25px;
        letter-spacing: 1px;
      }
    }
  }
}


`

const CategoryPage = () => {
  const {width, products, splitProductName} = useContext(AppContext)
  const location = useLocation()

  const [activeCat, setActiveCat] = useState()
  const [activeProducts, setActiveProducts] = useState([])


  useEffect(() => {
    setActiveCat(location.pathname.substring(1))
    let arr = []
    products.forEach((p) => {
      if (p.category === location.pathname.substring(1)) {
        arr.push(p)
      }
    })
    setActiveProducts(arr.reverse())
  }, [location, products])


	return (
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <>
    <Nav/>
		<StyledMain>
      <StyledHeroSection>
        <h2>{activeCat}</h2>
      </StyledHeroSection>
      <StyledProductsSection>
        {activeProducts ? activeProducts.map((p, i) => (
          <div key={i} className={`product-item ${p.slug}-item`}>
            <img src={process.env.PUBLIC_URL + p.categoryImage[`${width >= 770 ? 'desktop' : width < 770 && width > 414 ? 'tablet' : 'mobile'}`]} alt={p.name} />
              <div className="product-item-text">
                {p.new ? <span className="overline">NEW PRODUCT</span> : ''}
                {splitProductName(p.name, p.category)}
                <p>{p.description}</p>
                <Link to={`/${activeCat}/${p.slug}`}>SEE PRODUCT</Link>
              </div>
          </div>
        )): ''}
      </StyledProductsSection>
      <Categories/>
      <About/>
		</StyledMain>
    <Footer/>
    </>
    </ThemeProvider>
	);
};

export default CategoryPage;
