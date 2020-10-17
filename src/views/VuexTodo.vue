<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-3xl text-center p-2 font-bold">
      Vue 3 Todo App with Typescript and Vuex 4
    </h1>

    <div v-if="loading">
      <h3 class="text-center mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="text-center mt-2">
        {{ completedCount }} of {{ totalCount }} completed.
      </p>
      <NewItem />
      <TodoList />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NewItem from '../components/todovuex/NewItem.vue'
import TodoList from '../components/todovuex/TodoList.vue'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

@Options({
  components: {
    NewItem,
    TodoList
  }
})
export default class VuexTodo extends Vue {
  store = useStore()
  get loading () {
    return this.store.state.loading
  }

  mounted () {
    this.store.dispatch(ActionTypes.GetTodoItems)
  }

  get completedCount () {
    return this.store.getters.completedCount
  }

  get totalCount () {
    return this.store.getters.totalCount
  }
}
</script>
