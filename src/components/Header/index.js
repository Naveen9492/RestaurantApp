import {HiOutlineShoppingCart} from 'react-icons/hi'
import ResContext from '../../context/ResContext'
import './index.css'

const Header = () => (
  <ResContext.Consumer>
    {value => {
      const {cartItemsList, restaurantName} = value
      const count = cartItemsList.reduce((acc, item) => acc + item.count, 0)

      return (
        <div className="header-container">
          <h1 className="logo-name">{restaurantName}</h1>
          <div className="my-order-and-icon-container">
            <p className="my-orders-text">My Orders</p>
            <div className="cart-icon-container">
              <HiOutlineShoppingCart className="cart-icon" />
              <p className="cart-number">{count}</p>
            </div>
          </div>
        </div>
      )
    }}
  </ResContext.Consumer>
)

export default Header
