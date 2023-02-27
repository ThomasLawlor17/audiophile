import CartIcon from "./Cart"
import FacebookIcon from "./Facebook"
import HamburgerIcon from "./Hamburger"
import InstagramIcon from "./Instagram"
import TwitterIcon from "./Twitter"

const Icon = ({name}) => {
    switch (name) {
        case 'cart':
            return <CartIcon/>
        case 'hb':
            return <HamburgerIcon/>
        case 'facebook':
            return <FacebookIcon/>
        case 'twitter':
            return <TwitterIcon/>
        case 'instagram':
            return <InstagramIcon/>
    default:
        return null
    }
}

export default Icon