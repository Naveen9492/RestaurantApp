import {useState} from 'react'
import ResContext from '../../context/ResContext'
import './index.css'

const DishItem = props => {
  const {eachItem} = props
  const [quantity, setQuantity] = useState(eachItem.quantity)

  const incrementQuantity = () => setQuantity(prev => prev + 1)

  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  return (
    <ResContext.Consumer>
      {value => {
        const {addCartItem} = value

        const iconBorder =
          eachItem.dish_Type === 2 ? 'veg-border' : 'non-veg-border'
        const iconInner =
          eachItem.dish_Type === 2 ? 'veg-inner' : 'non-veg-inner'

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
                        onClick={decrementQuantity}
                        disabled={
                          quantity === 0 || eachItem.dish_Availability === false
                        }
                      >
                        -
                      </button>

                      <p className="cart-count">{quantity}</p>

                      <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={incrementQuantity}
                        disabled={eachItem.dish_Availability === false}
                      >
                        +
                      </button>
                    </div>
                    {quantity > 0 && (
                      <button
                        type="button"
                        className="addtocart-button-main"
                        onClick={() => addCartItem(eachItem)}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="not-available-text">Not available</p>
                )}

                {eachItem.addonCat && eachItem.addonCat.length > 0 && (
                  <p className="customization-text">Customizations available</p>
                )}
              </div>
            </div>

            <p className="calories">{eachItem.dish_calories} calories</p>
          </li>
        )
      }}
    </ResContext.Consumer>
  )
}

export default DishItem
