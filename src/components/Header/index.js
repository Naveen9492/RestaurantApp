import {HiOutlineShoppingCart} from 'react-icons/hi'
import {useEffect, useState} from 'react'
import ResContext from '../../context/ResContext'
import './index.css'

const Header = () => {
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

  return (
    <ResContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div className="header-container">
            <h1 className="logo-name">{restaurantName}</h1>
            <div className="my-order-and-icon-container">
              <p className="my-orders-text">My Orders</p>
              <div className="cart-icon-container">
                <HiOutlineShoppingCart className="cart-icon" />
                <p className="cart-number">{cartList.length}</p>
              </div>
            </div>
          </div>
        )
      }}
    </ResContext.Consumer>
  )
}

export default Header
