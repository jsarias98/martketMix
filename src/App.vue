<template>
  <v-app>
    <v-toolbar color="#ff6452" dark fixed app dense clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Market Mix</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-hover>
        <v-badge
          slot-scope="{ hover }"
          overlap
          color="warning"
          class="cart_badge"
        >
          <template v-slot:badge v-if="cart.items.length">
            <span dark small>{{cart.items.length}}</span>
          </template>
          <v-btn icon>
            <v-icon>shopping_cart</v-icon>
          </v-btn>
          <cart-top :show="hover"></cart-top>
        </v-badge>
      </v-hover>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Categorías</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list class="pt-0">
        <v-list-tile
          v-for="categorie in categories"
          :key="categorie.id"
          :to="{ path: '/categories/'+categorie.id}"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ categorie.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <v-navigation-drawer v-model="right" right temporary fixed></v-navigation-drawer>
  </v-app>
</template>

<script>
import CartTop from './components/CartTop'
import { mapMutations } from 'vuex'
// import { categories } from "./api"
export default {
  name: 'App',
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    categories: []
  }),
  props: {
    source: String
  },
  components: {
    CartTop
  },
  computed: {
    cart () {
      return this.$store.state.shoppingCart
    }
  },
  methods: {
    ...mapMutations(['setProducts'])
  },
  async beforeMount () {
    this.categories = await fetch('http://localhost:3000/categories').then(res => res.json())
    const products = await fetch('http://localhost:3000/products').then(res => res.json())
    this.setProducts(products)
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Merienda+One|Nunito:200,300,400,600,700,800,900&display=swap')
:not(i)
  font-family: 'Nunito', sans-serif
.cart_badge > span
  right 0 !important
  top 0 !important
.v-toolbar__title
  font-family: 'Merienda One', cursive
</style>
