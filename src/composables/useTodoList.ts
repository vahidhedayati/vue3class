import { ref, watchEffect } from 'vue'
import axios from 'axios'

const instance = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/todos' })
export interface TodoItemInterface {
  title: string;
  completed: boolean;
}
export interface FullItemInterface {
  id: number;
  title: string;
  completed: boolean;
}
export function useTodoList () {
  const todos = ref([
    { id: 1, title: 'Hello', completed: false },
    { id: 2, title: 'Composition', completed: false },
    { id: 3, title: 'API', completed: false }
  ])

  const shouldFetch = ref(false)

  watchEffect(() => {
    if (shouldFetch.value) {
      instance.get('?_limit=25')
        .then(res => {
          todos.value = res.data
          return res
        })
        .catch(err => console.log(err))
    }
  })

  function deleteFromList (id: number) {
    instance.delete(`/${id}`)
      .then(res => {
        if (res.status === 200) {
          todos.value = todos.value.filter(todo => todo.id !== id)
        }
      })
      .catch(err => console.log(err))
  }

  function addToList (newTodo: TodoItemInterface) {
    console.log(typeof newTodo)
    const { title, completed } = newTodo
    instance.post('/', { title, completed })
      .then(res => todos.value.push(res.data))
      .catch(err => console.log(err))
  }

  return {
    todos,
    shouldFetch,
    deleteFromList,
    addToList
  }
}
