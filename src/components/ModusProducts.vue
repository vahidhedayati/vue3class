<template>
  <ul>
    <li v-for="product in products.products" :key="product.id">
      {{ product.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import useProducts from '../composables/products'

export default class ModusProducts extends Vue {
  products = {}
  mounted () {
    this.setup()
  }

  beforeRouteEnter (to: any, from: any, next: any) {
    console.log('router enter')
    next()
  }

  async setup () {
    this.products = await useProducts()
  }
}
</script>

<style scoped>

</style>
