<template>
  <v-container fluid grid-list-xl>
    <h3>CARRITO DE COMPRAS</h3>
    <p>{{cart.items.length}} {{cart.items.length > 1 ? 'productos': 'producto'}}.</p>
    <v-layout wrap>
      <v-flex xs12 sm8>
        <v-layout wrap>
          <v-flex xs12 v-for="item in cart.items" :key="item.id">
            <v-card>
              <v-card-text>
                <v-layout wrap justify-space-between align-center>
                  <v-flex shrink pr2>
                    <h2>{{item.name}}</h2>
                    <v-input>
                      <v-text-field
                        v-model="item.quantity"
                        class="mt-0"
                        hide-details
                        @keypress="isNumber($event)"
                        @change="preventMajor(item)"
                        label="Cantidad."
                        type="number"
                        pattern="^[0-9]+"
                        :step="1"
                        :min="0"
                        :max="products.find(product => product.id === item.id).quantity"
                      ></v-text-field>
                    </v-input>
                    <span>{{products.find(product => product.id === item.id).quantity}} en stock</span>
                  </v-flex>
                  <v-flex shrink>
                    <h3 class="pb-3">Valor unitario: {{item.price}}</h3>
                    <h3 class="pb-3">Valor total: {{(item.priceNumber * item.quantity) | numberToPrice }}</h3>
                    <a class="red--text" @click="deleteProduct(item)">Eliminar producto</a>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 v-show="!cart.items.length">
            <v-card>
              <v-card-text>
                <h5>No tienes ningún producto en el carrito de compras</h5>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm4>
        <v-card>
          <v-card-text>
            <v-layout justify-space-between pa-3>
              <h2>TOTAL</h2>
              <p>{{total | numberToPrice}}</p>
            </v-layout>

            <v-btn :disabled="!cart.items.length" @click="buy" block :dark="!!cart.items.length">comprar</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import { isNumber } from './../utils'
export default {
  name: 'shoppingCart',
  computed: {
    cart () {
      return this.$store.state.shoppingCart
    },
    subtotal () {
      return this.$store.getters.totalCartValue
    },
    products () {
      return this.$store.state.products
    },
    total () {
      const { items } = this.cart
      let total = 0
      const length = items.length
      for (let i = 0; i < length; i++) {
        const item = items[i]
        total += item.quantity * item.priceNumber
      }
      return total
    }
  },
  filters: {
    numberToPrice (number) {
      if (typeof number === 'number') {
        return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      }
      return number
    }
  },
  methods: {
    preventMajor (item) {
      // prevent quantity cahnges to be a=major then stock existances
      const product = this.products.find(product => product.id === item.id)
      if (product.quantity < item.quantity) {
        item.quantity = product.quantity
      }
    },
    deleteProduct (item) {
      this.$store.commit('removeItemFromCart', item)
    },
    buy () {
      const cartLength = this.cart.items.length
      // substract the bought quantity
      const productsUpdated = this.products.map(product => {
        for (let i = 0; i < cartLength; i++) {
          const item = this.cart.items[i]
          if (item.id === product.id) {
            product.quantity -= item.quantity
            break
          }
        }
        return product
      })
      this.$store.commit('updateProducts', productsUpdated)
      this.$store.commit('cleanShoppingCart')
      Swal.fire('Excelente!', 'Compra realizada con éxito!', 'success')
      this.$router.push('/')
    },
    isNumber
  }
}
</script>

<style>
</style>
