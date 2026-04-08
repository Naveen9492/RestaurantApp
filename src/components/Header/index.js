import {HiOutlineShoppingCart} from 'react-icons/hi'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const [restaurantName, setRestaurantName] = useState('')

  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        const restaurantData = data[0].restaurant_name
        setRestaurantName(restaurantData)
      } catch (err) {
        setRestaurantName('Faile to Fetch')
      }
    }

    fetchRestaurantName()
  }, [])

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div className="header-container">
            <Link to="/" className="nav-link">
              <h1 className="logo-name">{restaurantName}</h1>
            </Link>
            {Cookies.get('jwt_token') && (
              <div className="my-order-and-icon-container">
                <p className="my-orders-text">My Orders</p>

                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>

                <div>
                  <Link to="/cart">
                    <button
                      type="button"
                      data-testid="cart"
                      className="cart-button"
                    >
                      <div className="cart-icon-container">
                        <HiOutlineShoppingCart className="cart-icon" />
                        <p className="cart-number">{cartList.length}</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
