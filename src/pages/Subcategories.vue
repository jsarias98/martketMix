<template>
  <v-container fluid grid-list-xs>
    <div v-if="currentCategory">
      <v-layout wrap justify-space-between>
        <v-flex xs12 sm6>
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>chevron_right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
        <v-flex xs12 sm4 v-if="!currentCategory.sublevels">
          <v-text-field v-model="search" solo label="Buscar..." clearable append-icon="search"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row v-if="currentCategory.sublevels">
        <v-flex xs12 sm6 md4 v-for="category in currentCategory.sublevels" :key="category.id">
          <category :category="category" @click.native="goTo(category.id)"></category>
        </v-flex>
      </v-layout>
      <div v-else>
        <v-layout row wrap mb-3>
          <v-flex shrink mr-2 style="width: 120px">
            <v-text-field
              :prefix="currency"
              v-model="priceRange[0]"
              class="mt-0"
              hide-details
              @keypress="isNumber($event)"
              label="Precio min."
              type="number"
              pattern="^[0-9]+"
              :step="1000"
              :min="0"
              :max="priceRange[1]"
            ></v-text-field>
          </v-flex>
          <v-flex shrink mr-2 style="width: 120px">
            <v-text-field
              :prefix="currency"
              v-model="priceRange[1]"
              class="mt-0"
              hide-details
              @keypress="isNumber($event)"
              pattern="^[0-9]+"
              label="Precio max."
              type="number"
              :step="1000"
              :min="priceRange[0]"
            ></v-text-field>
          </v-flex>
          <v-flex shrink mr-2 style="width: 120px">
            <v-text-field
              v-model="stock"
              class="mt-0"
              pattern="^[0-9]+"
              hide-details
              @keypress="isNumber($event)"
              label="Cantidad en stock."
              type="number"
              :step="1"
              :min="0"
            ></v-text-field>
          </v-flex>
          <v-flex shirnk>
            <v-checkbox v-model="available" label="Sólo disponibles" color="primary"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id">
            <product :product="product" @addToCart="addToCart"></product>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <p v-else>La categoría que buscas no se encuentra</p>

    <v-snackbar v-model="snackbar" bottom right :timeout="5000">
      {{ snackbarText }}
      <v-btn color="primary" flat @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { buildCategoriesPath, isNumber } from './../utils'

import Category from './../components/Category.vue'
import Product from './../components/Product.vue'
export default {
  name: 'subCategories',
  data: () => ({
    items: [],
    currentCategory: {},
    search: '',
    priceRange: [],
    currency: '$',
    maxValue: 1000,
    minValue: 0,
    available: false,
    stock: 1,
    snackbar: false,
    snackbarText: '',
    categoriesApi: []
  }),
  methods: {
    getCategory (ids) {
      let i = 0
      let length = ids.length
      let obj = this.categoriesApi
      for (i; i < length; i++) {
        if (!obj) return false
        if (obj instanceof Array) {
          obj = obj.find(category => category.id == ids[i])
        } else {
          obj = obj.sublevels.find(category => category.id == ids[i])
        }
      }
      return obj
    },
    goTo (id) {
      const { currentRoute } = this.$router
      this.$router.push(`${currentRoute.path}/${id}`)
    },
    isNumber,
    addToCart (product) {
      const productToSend = {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNumber: product.priceNumber,
        quantity: 1
      }
      const productInCart = this.cart.items.find(
        item => item.id === productToSend.id
      )

      // validations to know id there is enough produt in stock
      if (productInCart) {
        const total = productToSend.quantity + productInCart.quantity
        if (product.quantity >= total) {
          this.snackbarText = `Producto ${product.name} agregado al carrito!`
          this.$store.commit('addProduct', productToSend)
        } else {
          this.snackbarText = `No hay suficientes ${product.name} en stock`
        }
      } else {
        if (product.quantity >= productToSend.quantity) {
          this.snackbarText = `Producto ${product.name} agregado al carrito!`
          this.$store.commit('addProduct', productToSend)
        } else {
          this.snackbarText = `No hay ${product.name} en stock`
        }
      }

      this.snackbar = true
    }
  },

  computed: {
    allProducts () {
      const products = this.$store.getters.productBy(this.currentCategory.id)
      return products.map(product => {
        // regular expression to delete all the non number characters
        const priceStr = product.price.replace(/[\D]/g, '')
        product.priceNumber = Number(priceStr)

        return product
      })
    },
    products () {
      // do all filters
      return this.allProducts.filter(product => {
        const name = product.name.toLowerCase()

        if (this.stock > product.quantity) return false

        if (this.available && !product.available) return false

        if (this.search) {
          const lookingFor = this.search.toLowerCase()
          if (name.search(lookingFor) === -1) return false
        }

        const price = product.priceNumber
        if (price < this.priceRange[0]) return false
        if (price > this.priceRange[1]) return false
        return true
      })
    },
    cart () {
      return this.$store.state.shoppingCart
    }
  },
  components: { Category, Product },
  async beforeMount () {
    this.categoriesApi = await fetch('http://localhost:3000/categories').then(res => res.json())

    const { lv1, lv2, lv3, lv4, lv5 } = this.$route.params
    const ids = []

    if (lv1) ids.push(lv1)
    if (lv2) ids.push(lv2)
    if (lv3) ids.push(lv3)
    if (lv4) ids.push(lv4)
    if (lv5) ids.push(lv5)
    const categories = []
    let length = ids.length

    for (let i = 0; i < length; i++) {
      const currentIds = ids.slice(0, i + 1)
      categories.push(this.getCategory(currentIds))
    }
    this.currentCategory = categories[length - 1]

    if (this.currentCategory) {
      this.items = categories.map((category, i) => ({
        text: category.name,
        disabled: i == length - 1,
        to: { path: buildCategoriesPath(ids, i) },
        exact: true
      }))

      if (!this.currentCategory.sublevels) {
        const allPrices = this.allProducts.map(product => product.priceNumber)

        this.minValue = Math.min(...allPrices)
        this.maxValue = Math.max(...allPrices)

        this.priceRange = [this.minValue, this.maxValue]
      }
    }
  }
}
</script>

<style>
</style>
