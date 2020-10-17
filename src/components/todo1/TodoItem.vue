<template>
  <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
      <input type="checkbox" v-on:change="markComplete" v-bind:checked="todo.completed">
      {{todo.title}}
      <button @click="deleteFromList(todo.id)">X</button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { FullItemInterface } from '@/composables/useTodoList'
/*
export interface FullItemInterface2 {
  id: number;
  title: string;
  completed: boolean;
}
*/
@Options({
  props: {
    todo: undefined
  }
})
export default class TodoItem extends Vue {
    todo!: FullItemInterface
    markComplete () {
      this.todo.completed = !this.todo.completed
    }

    deleteFromList (id: number) {
      this.$emit('del-todo', id)
    }
}
</script>

<style scoped>
  .todo-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }

  .is-complete {
    text-decoration: line-through;
  }

  .del {
    background: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
  }
</style>
