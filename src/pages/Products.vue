<template>
  <v-container fluid>
    <v-layout wrap justify-space-between>
      <v-flex xs12 sm6>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>chevron_right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field v-model="search" solo label="Buscar..." clearable append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex sm-12 md-5>
        <v-layout>
          <v-flex shrink style="width: 80px">
            <v-text-field
              :prefix="currency"
              v-model="priceRange[0]"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex class="px-3">
            <v-range-slider v-model="priceRange" :max="maxValue" :min="minValue" :step="50"></v-range-slider>
          </v-flex>

          <v-flex shrink style="width: 80px">
            <v-text-field
              :prefix="currency"
              v-model="priceRange[1]"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id">
        <product :product="product"></product>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getCategory, getSubcategory, getDeepSubcategory } from './../api'

import Product from './../components/Product.vue'
export default {
  name: 'products',
  data: () => ({
    items: [],
    search: '',
    priceRange: [],
    currency: '$',
    maxValue: 1000,
    minValue: 0
  }),
  computed: {
    allProducts () {
      return this.$store.getters.productBy(this.$route.params.deepSubCategory)
    },
    products () {
      return this.allProducts.filter(product => {
        const name = product.name.toLowerCase()
        if (this.search) {
          const lookingFor = this.search.toLowerCase()
          if (name.search(lookingFor) === -1) return false
        }

        return true
      })
    }
  },
  components: { Product },
  beforeMount () {
    const allPrices = this.products.map(
      product => product.price.value
    )

    this.minValue = Math.min(...allPrices) - 5000
    this.maxValue = Math.max(...allPrices) + 5000

    this.priceRange = [this.minValue, this.maxValue]

    const { category, subcategory, deepSubCategory } = this.$route.params
    const categoryObject = getCategory(category)
    const subcategoryObject = getSubcategory(subcategory)
    const deepSubcategoryObject = getDeepSubcategory(deepSubCategory)
    this.items = [
      {
        text: categoryObject.name,
        disabled: false,
        to: { path: `/categories/${category}` },
        exact: true
      },
      {
        text: subcategoryObject.name,
        disabled: false,
        to: { path: `/categories/${category}/${subcategory}` },
        exact: true
      },
      {
        text: deepSubcategoryObject.name,
        disabled: true,
        to: {
          path: `/categories/${category}/${subcategory}/${deepSubCategory}`
        },
        exact: true
      }
    ]
  }
}
</script>

<style>
</style>
