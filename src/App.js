import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import CartContext from './context/CartContext'
import Body from './components/Body'
import Login from './components/Login'
import Cart from './components/Cart'
import './App.css'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = itemDetails => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.dish_id === itemDetails.dish_id,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(item =>
            item.dish_id === itemDetails.dish_id ? itemDetails : item,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, itemDetails],
      }
    })
  }

  removeCartItem = itemDetails => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachItem => eachItem.dish_id !== itemDetails.dish_id,
      ),
    }))
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.dish_id === dishId,
      )

      if (!existingItem) return null

      if (existingItem.quantity > 1) {
        return {
          cartList: prevState.cartList.map(item =>
            item.dish_id === dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          ),
        }
      }

      return {
        cartList: prevState.cartList.filter(item => item.dish_id !== dishId),
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/">
            <>
              <Header />
              <Body />
            </>
          </ProtectedRoute>
          <ProtectedRoute exact path="/cart">
            <>
              <Header />
              <Cart />
            </>
          </ProtectedRoute>
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
