<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <h1 class="title-home">Market Mix</h1>
      </v-flex>
      <v-flex mb-4>
        <h2 class="sub-title-home mb-3">
          Bienvenido a la mejor tienda
        </h2>
        <p class="subheading font-weight-regular">
          Selecciona la categoría de interés
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <v-icon x-large color="primary">skeyboard_backspace</v-icon>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style lang="stylus" scoped>
.title-home
  font-family: 'Merienda One', cursive;
  font-size 4em
.sub-title-home
  font-size 2em
</style>
