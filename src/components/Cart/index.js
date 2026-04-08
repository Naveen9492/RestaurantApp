import {CgClose} from 'react-icons/cg'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const onClickMinusButton = id => {
        const currentItemDetails = cartList.find(
          eachItem => eachItem.dish_id === id,
        )
        if (currentItemDetails.quantity === 1) {
          return removeCartItem(currentItemDetails)
        }
        return decrementCartItemQuantity(currentItemDetails.dish_id)
      }

      const onClickPlusButton = id => {
        incrementCartItemQuantity(id)
      }

      const onClickCrossButton = selectedItem => {
        removeCartItem(selectedItem)
      }

      const onClickRemoveAllButton = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-container">
          <h1 className="cart-heading">Cart Details</h1>
          {cartList.length > 0 ? (
            <>
              <button
                type="button"
                className="remove-all-button"
                onClick={onClickRemoveAllButton}
              >
                Remove all
              </button>
              <ul className="cart-item-container">
                {cartList.map(eachItem => (
                  <li className="each-item-container" key={eachItem.dish_id}>
                    <p className="dish-name-cart">{eachItem.dish_name}</p>
                    <div className="each-item-quantity-container">
                      <button
                        type="button"
                        className="minus-plus-button-cart"
                        onClick={() => {
                          onClickMinusButton(eachItem.dish_id)
                        }}
                      >
                        -
                      </button>
                      <p className="each-item-qty-cart">{eachItem.quantity}</p>
                      <button
                        type="button"
                        className="minus-plus-button-cart"
                        onClick={() => {
                          onClickPlusButton(eachItem.dish_id)
                        }}
                      >
                        +
                      </button>
                    </div>
                    <p className="dish-item-cart-price">
                      Price{' '}
                      <span className="dish-item-cart-price-span">
                        {eachItem.quantity * eachItem.dish_price}
                      </span>
                    </p>
                    <button
                      type="button"
                      className="remove-item-cart-button"
                      onClick={() => {
                        onClickCrossButton(eachItem)
                      }}
                    >
                      <CgClose className="cross-icon-cart" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="total-price-container">
                <p className="total-price">
                  Total Items{' '}
                  <span className="total-price-span">{cartList.length}</span>
                </p>
                <p className="total-price">
                  Total Price{' '}
                  <span className="total-price-span">
                    {cartList.reduce(
                      (acc, item) => acc + item.quantity * item.dish_price,
                      0,
                    )}
                    /-
                  </span>
                </p>
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <p className="no-orders-text">No items added</p>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
