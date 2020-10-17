<template>
  <VuexTodoItem v-for="item in items" :key="item" v-bind="item" />
</template>

<script lang="ts">
import { useStore } from '@/store'
import VuexTodoItem from '@/components/todovuex/VuexTodoItem.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    VuexTodoItem
  }
})
export default class TodoList extends Vue {
  store = useStore()
  get items () {
    return this.store.state.items
  }
}
</script>
