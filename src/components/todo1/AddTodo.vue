<template>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="title" name="title" placeholder="Add Todo...">
      <input type="submit" value="Submit" class="btn">
    </form>
    @Watcher :  {{ watchedTitle }} <br/>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

export default class AddTodo extends Vue {
  title = ''
  watchedTitle = ''

  @Watch('title')
  onPropertyChanged (value, oldValue) {
    this.watchedTitle = 'Changed from ' + oldValue + ' to ' + value
  }

  addTodo () {
    const newTodo = {
      title: this.title,
      completed: false
    }
    // Send up to parent
    this.$emit('add-todo', newTodo)

    this.title = ''
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>
