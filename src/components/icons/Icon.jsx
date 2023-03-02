import ArrowIcon from "./Arrow"
import CartIcon from "./Cart"
import DeliveryIcon from "./Delivery"
import FacebookIcon from "./Facebook"
import HamburgerIcon from "./Hamburger"
import InstagramIcon from "./Instagram"
import LogoIcon from "./Logo"
import TwitterIcon from "./Twitter"

const Icon = ({name}) => {
    switch (name) {
        case 'logo':
            return <LogoIcon/>
        case 'cart':
            return <CartIcon/>
        case 'hb':
            return <HamburgerIcon/>
        case 'arrow':
            return <ArrowIcon/>
        case 'facebook':
            return <FacebookIcon/>
        case 'twitter':
            return <TwitterIcon/>
        case 'instagram':
            return <InstagramIcon/>
        case 'cod':
            return <DeliveryIcon/>
    default:
        return null
    }
}

export default Icon