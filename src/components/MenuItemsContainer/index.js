import DishItem from '../DishItem'
import './index.css'

const MenuItemsContainer = props => {
  const {menuList, activeMenuId} = props

  const activeCategory = menuList.find(
    category => category.menu_category_id === activeMenuId,
  )

  const dishesToRender = activeCategory?.category_dishes || []

  return (
    <ul className="menu-items-container">
      {dishesToRender.map(eachItem => (
        <DishItem key={eachItem.dish_id} eachItem={eachItem} />
      ))}
    </ul>
  )
}

export default MenuItemsContainer
