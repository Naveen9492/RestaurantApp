import {Component} from 'react'

import Header from './components/Header'
import ResContext from './context/ResContext'
import Body from './components/Body'
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
            item.dish_id === itemDetails.dish_id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, {...itemDetails, quantity: 1}],
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
      <ResContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <>
          <Header />
          <Body />
        </>
      </ResContext.Provider>
    )
  }
}

export default App
