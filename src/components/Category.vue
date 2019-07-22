<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 10 : 2}`"
      color="white"
      style="cursor: pointer"
    >
      <v-card-title primary-title>
        <div>
          <div class="headline red--text">{{category.name}}</div>
        </div>
      </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'category',
  props: {
    category: Object
  }
}
</script>

<style lang="stylus">
.headline
  font-family 'Nunito', sans-serif !important
  font-weight 600
</style>
