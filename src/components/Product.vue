<template>
  <v-card
    :class="`pa-2`"
    :color="`${product.available ? 'white' : 'grey lighten-3'}`"
  >
    <v-layout>
      <v-flex xs-8>
        <h2 class="headline red--text">{{product.name}}</h2>
        <span class="body-1 black--text">{{product.price}}</span><br>
        <span class="body-1 black--text">{{product.quantity}} en stock</span>
      </v-flex>
      <v-flex xs-4 text-xs-right class="right-center">
        <v-btn icon color="primary" :disabled="!product.available" @click="$emit('addToCart', product)">
          <v-icon >shopping_cart</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<style scoped lang="stylus">
.right-center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

<script>
export default {
  name: 'product',
  props: {
    product: Object
  }
}
</script>

<style>
</style>
