import {Component} from 'react'
import CategoryMenuList from '../CategoryMenuList'
import MenuItemsContainer from '../MenuItemsContainer'
import ResContext from '../../context/ResContext'

class Body extends Component {
  state = {
    menuList: [],
    activeMenuId: '',
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
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
    })

    const {setRestaurantName} = this.context
    setRestaurantName(restaurantData.restaurant_name)
  }

  changeActiveMenu = id => {
    this.setState({activeMenuId: id})
  }

  render() {
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
}

Body.contextType = ResContext
export default Body
