import ResContext from '../../context/ResContext'
import './index.css'

const DishItem = props => (
  <ResContext.Consumer>
    {value => {
      const {cartItemsList, updateCartItemsList} = value
      const {eachItem} = props

      const cartItem = cartItemsList.find(
        item => item.dish_id === eachItem.dish_id,
      )
      const cartCount = cartItem ? cartItem.count : 0

      const handleIncrease = () => {
        updateCartItemsList({...eachItem, change: 1})
      }

      const handleDecrease = () => {
        if (cartCount > 0) {
          updateCartItemsList({...eachItem, change: -1})
        }
      }

      const iconBorder =
        eachItem.dish_Type === 2 ? 'veg-border' : 'non-veg-border'
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

              <div className="add-to-cart-button-container">
                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={handleDecrease}
                  disabled={
                    cartCount === 0 || eachItem.dish_Availability === false
                  }
                >
                  -
                </button>

                <p data-testid="quantity" className="cart-count">
                  {cartCount}
                </p>

                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={handleIncrease}
                  disabled={eachItem.dish_Availability === false}
                >
                  +
                </button>
              </div>
              {eachItem.dish_Availability === false && (
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

export default DishItem
