<template>
  <v-fade-transition>
    <div class="top-shopping-cart elevation-10" v-show="show">
      <div class="products scroll-y" v-show="cart.items.length">
        <v-list two-line light subheader>
          <v-list-tile v-for="item in cart.items" :key="item.id" @click="$event.preventDefault()">
            <v-list-tile-avatar>
                <v-btn color="red" flat icon @click="remove(item)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Cantidad: {{item.quantity}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <span>{{item.price}}</span>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>
            Subtotal
            <v-spacer></v-spacer>
            {{subtotal}}
          </v-subheader>
        </v-list>
        <v-btn block to="/shoppingcart">Ir al carrito</v-btn>
      </div>
      <div class="no-products grey--text" v-show="!cart.items.length">
        <h3 class="title text-xs-center">Agrega un producto al carrito!</h3>
      </div>
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'cartTop',
  props: {
    show: Boolean
  },
  methods: {
    remove (item) {
      this.$store.commit('removeItemFromCart', item)
    }
  },
  computed: {
    cart () {
      return this.$store.state.shoppingCart
    },
    subtotal () {
      return this.$store.getters.totalCartValue
    }
  }
}
</script>
<style scoped lang="stylus">
.top-shopping-cart
  position absolute
  padding 10px
  background white
  border-radius 5px
  width 270px
  height 200px
  min-height fit-content
  max-height 321px
  right 0
  top 50px
  .no-products
    display flex
    height 100%
    align-items center
  .v-list
    max-height 280px !important
    overflow-y auto !important
.top-shopping-cartbefore
  content ""
  display block
  position absolute
  right 17px
  transform rotate(45deg)
  top -7px
  width 15px
  height 15px
  background white
</style>
