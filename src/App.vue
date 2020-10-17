<template>
  <Header/>
  <router-view/>
</template>
<script lang="ts">
import Header from './components/Header.vue'
import { Options, Vue } from 'vue-class-component'
@Options({
  components: { Header }
})
export default class App extends Vue {

}
</script>
