import {useState, useEffect, useContext} from 'react'
import ResContext from '../../context/ResContext'
import './index.css'

const DishItem = props => {
  const {eachItem} = props
  const {
    cartList,
    addCartItem,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(ResContext)
  const [quantity, setQuantity] = useState(eachItem.dish_quantity)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const cartItem = cartList.find(item => item.dish_id === eachItem.dish_id)

  // Sync local quantity with cart when cartItem changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity)
      setIsAddedToCart(Boolean(cartItem))
    }
  }, [cartItem])

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))
  }

  const iconBorder = eachItem.dish_Type === 2 ? 'veg-border' : 'non-veg-border'
  const iconInner = eachItem.dish_Type === 2 ? 'veg-inner' : 'non-veg-inner'

  return (
    <li className="dish-listitem">
      <img
        className="dish-image"
        src={eachItem.dish_image}
        alt={eachItem.dish_name}
      />
      <div className="icon-dish-details-container">
        <div className={iconBorder}>
          <div className={iconInner} />
        </div>

        <div className="dish-details-container">
          <h1 className="dish-name">{eachItem.dish_name}</h1>
          <p className="dish-price">
            {eachItem.dish_currency} {eachItem.dish_price}
          </p>
          <p className="dish-description">{eachItem.dish_description}</p>
          {eachItem.dish_Availability === true ? (
            <div className="button-container">
              <div className="add-to-cart-button-container">
                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={() => {
                    if (cartItem) {
                      if (cartItem.quantity === 1) {
                        removeCartItem(cartItem)
                        decrementQuantity()
                        setIsAddedToCart(false)
                      } else {
                        decrementCartItemQuantity(cartItem.dish_id)
                      }
                    } else {
                      decrementQuantity()
                    }
                  }}
                >
                  -
                </button>
                <p className="cart-count">{quantity}</p>
                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={
                    cartItem
                      ? () => incrementCartItemQuantity(eachItem.dish_id)
                      : incrementQuantity
                  }
                >
                  +
                </button>
              </div>
              {quantity > 0 && (
                <button
                  type="button"
                  className="addtocart-button-main"
                  onClick={() => {
                    if (isAddedToCart) {
                      incrementCartItemQuantity(eachItem.dish_id)
                    } else {
                      addCartItem({...eachItem, quantity})
                    }
                  }}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          ) : (
            <>
              <p>{quantity}</p>
              <p className="not-available-text">Not available</p>
            </>
          )}

          {eachItem.addonCat && eachItem.addonCat.length > 0 && (
            <p className="customization-text">Customizations available</p>
          )}
        </div>
      </div>
      <p className="calories">{eachItem.dish_calories} calories</p>
    </li>
  )
}

export default DishItem
