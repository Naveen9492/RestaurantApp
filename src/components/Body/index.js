import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CategoryMenuList from '../CategoryMenuList'
import MenuItemsContainer from '../MenuItemsContainer'
import ResContext from '../../context/ResContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Body extends Component {
  state = {
    apiStatus: apiConstants.initial,
    menuList: [],
    activeMenuId: '',
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await response.json()
      const restaurantData = data[0]

      const formattedMenuList = restaurantData.table_menu_list.map(menu => ({
        menu_category: menu.menu_category,
        menu_category_id: menu.menu_category_id,
        category_dishes: menu.category_dishes.map(dish => ({
          dish_id: dish.dish_id,
          dish_name: dish.dish_name,
          dish_price: dish.dish_price,
          dish_currency: dish.dish_currency,
          dish_description: dish.dish_description,
          dish_image: dish.dish_image,
          dish_calories: dish.dish_calories,
          dish_Availability: dish.dish_Availability,
          dish_Type: dish.dish_Type,
          addonCat: dish.addonCat || [],
        })),
      }))

      this.setState({
        menuList: formattedMenuList,
        activeMenuId: formattedMenuList[0].menu_category_id,
        apiStatus: apiConstants.success,
      })

      const {setRestaurantName} = this.context
      setRestaurantName(restaurantData.restaurant_name)
    } catch (error) {
      this.setState({apiStatus: apiConstants.failure})
      const {setRestaurantName} = this.context
      setRestaurantName('UNI Resto Cafe')
    }
  }

  changeActiveMenu = id => {
    this.setState({activeMenuId: id})
  }

  renderSuccessView = () => {
    const {menuList, activeMenuId} = this.state
    return (
      <>
        <CategoryMenuList
          menuList={menuList}
          activeMenuId={activeMenuId}
          changeActiveMenu={this.changeActiveMenu}
        />
        <MenuItemsContainer menuList={menuList} activeMenuId={activeMenuId} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="retry-container">
      <p>Failed to fetch details</p>
      <button type="button" onClick={this.getMenuData} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="loader-container">
            <Loader type="Oval" color="#680707" height={80} width={80} />
          </div>
        )
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderFinalView()
  }
}

Body.contextType = ResContext
export default Body
