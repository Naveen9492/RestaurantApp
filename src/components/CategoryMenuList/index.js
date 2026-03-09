import {Component} from 'react'

import './index.css'

class CategoryMenuList extends Component {
  changeCategoryId = id => {
    const {changeActiveMenu} = this.props
    changeActiveMenu(id)
  }

  render() {
    const {menuList, activeMenuId} = this.props
    return (
      <div className="menu-container">
        {menuList.map(eachMenu => (
          <button
            key={eachMenu.menu_category_id}
            type="button"
            className={
              activeMenuId === eachMenu.menu_category_id
                ? 'active-menu-button'
                : 'menu-button'
            }
            onClick={() => this.changeCategoryId(eachMenu.menu_category_id)}
          >
            {eachMenu.menu_category}
          </button>
        ))}
      </div>
    )
  }
}
export default CategoryMenuList
