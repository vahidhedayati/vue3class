<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" width="30">
    <HelloWorld msg="Hi there"/>
    {{ x }} {{ y }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { useMousePosition } from '@/composables/useMousePosition'
@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  a = useMousePosition()
  x = this.a.x
  y = this.a.y
}
</script>
