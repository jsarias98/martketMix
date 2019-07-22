import Home from './../pages/Home.vue'
import Subcategories from './../pages/Subcategories.vue'
import ShoppingCart from './../pages/ShoppingCart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/categories/:lv1', component: Subcategories },
  { path: '/categories/:lv1/:lv2', component: Subcategories },
  { path: '/categories/:lv1/:lv2/:lv3', component: Subcategories },
  { path: '/categories/:lv1/:lv2/:lv3/:lv4', component: Subcategories },
  { path: '/categories/:lv1/:lv2/:lv3/:lv4/:lv5', component: Subcategories },
  { path: '/shoppingcart', component: ShoppingCart }
]

export default routes
