import {Component} from 'react'

import Header from './components/Header'
import ResContext from './context/ResContext'
import Body from './components/Body'
import './App.css'

class App extends Component {
  state = {
    cartItemsList: [],
    restaurantName: '',
  }

  setRestaurantName = name => {
    this.setState({restaurantName: name})
  }

  updateCartItemsList = itemDetails => {
    this.setState(prevState => {
      const existingItem = prevState.cartItemsList.find(
        item => item.dish_id === itemDetails.dish_id,
      )

      if (!existingItem && itemDetails.change < 0) {
        return null
      }
      if (existingItem) {
        const newCount = existingItem.count + itemDetails.change

        if (newCount <= 0) {
          return {
            cartItemsList: prevState.cartItemsList.filter(
              item => item.dish_id !== itemDetails.dish_id,
            ),
          }
        }

        return {
          cartItemsList: prevState.cartItemsList.map(item =>
            item.dish_id === itemDetails.dish_id
              ? {...item, count: newCount}
              : item,
          ),
        }
      }

      if (itemDetails.change > 0) {
        return {
          cartItemsList: [
            ...prevState.cartItemsList,
            {...itemDetails, count: itemDetails.change},
          ],
        }
      }

      return null
    })
  }

  render() {
    const {cartItemsList, restaurantName} = this.state

    return (
      <ResContext.Provider
        value={{
          cartItemsList,
          updateCartItemsList: this.updateCartItemsList,
          restaurantName,
          setRestaurantName: this.setRestaurantName,
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
