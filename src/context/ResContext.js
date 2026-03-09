import React from 'react'

const ResContext = React.createContext({
  cartItemsList: [],
  updateCartItemsList: () => {},
  restaurantName: '',
  setRestaurantName: () => {},
})

export default ResContext
