<template>
  <div class="nav">
    <!--button @click="addToList()">Add new item</button -->
    <AddTodo v-on:add-todo="addTodo"/>

    <div class="buttons">
      <label for="split-color">Split Color</label>
      <input id="split-color" type="checkbox" v-model="splitColor" />
    </div>

    <div class="buttons">
      <label for="fetch-list">Fetch List</label>
      <input
        id="fetch-list"
        type="checkbox"
        :disabled="shouldFetch"
        v-model="shouldFetch"
      />
    </div>
    <div class="mouse-position">X: {{ x }} | Y: {{ y }}</div>
  </div>
  <div v-if="!splitColor">
    <div v-bind:key="todo.id" v-for="todo in todos" >
      <TodoItem v-bind:todo="todo" v-on:del-todo="deleteFromList(todo.id)"  />
    </div>
  </div>
  <div v-if="splitColor">
    <ul v-for="(todos, key) in todosList" :key="key">
      <li v-for="todo in todos" :key="todo.id" :class="`list-${key}`">
        <span>{{ todo.title }}  Key({{key}})</span>
        <button @click="deleteFromList(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTodoList } from '@/composables/useTodoList'
import { useMousePosition } from '@/composables/useMousePosition'
import { Options, Vue } from 'vue-class-component'
import AddTodo from '@/components/todo1/AddTodo'
import TodoItem from '@/components/todo1/TodoItem'
@Options({
  components: {
    AddTodo,
    TodoItem
  }
})
export default class Todo extends Vue {
  // TodoList
  tdl = useTodoList()
  todos = this.tdl.todos
  shouldFetch = this.tdl.shouldFetch
  deleteFromList = this.tdl.deleteFromList
  addToList = this.tdl.addToList
  // Mouse
  mouse = useMousePosition()
  x = this.mouse.x
  y = this.mouse.y
  // Variables
  splitColor = false
  // Computed Value equivalent to todosList
  get todosList () {
    if (this.splitColor) {
      console.log('aaa ' + JSON.stringify(this.todos))
      const halfList = this.todos.length / 2
      return [this.todos.slice(0, halfList), this.todos.slice(halfList)]
    }
    return [this.todos]
  }

  addTodo (newTodo) {
    // calls method in composable/useTodoList
    this.addToList(newTodo)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
button {
  padding: 14px;
}
.nav {
  position: sticky;
  top: 0;
  background: white;
  z-index: 99;
  display: flex;
  align-items: center;
}
ul {
  margin: 0;
  padding: 0;
}
ul li {
  padding: 14px;
  margin: 8px 0;
  list-style-type: none;
  position: relative;
  overflow: hidden;
  background-color: rgb(180, 202, 139);
}
ul li button {
  position: absolute;
  right: 8px;
  top: calc(50% - 18px);
  padding: 8px;
}
.list-1 {
  background-color: rgb(93, 136, 65);
}
.buttons {
  display: inline-block;
  padding: 8px;
  border: 1px dotted black;
}
.buttons label {
  margin-right: 8px;
}
.buttons input {
  width: 30px;
  height: 30px;
  margin: 0;
  vertical-align: middle;
}
</style>
