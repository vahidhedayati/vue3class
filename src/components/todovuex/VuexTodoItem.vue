<template>
  <div
    class="flex items-center bg-white rounded-md shadow-md m-2 p-1 border-4"
    :class="completed ? 'border-green-500' : 'border-white'"
  >
    <div class="flex-shrink-0 m-1 ml-3 align-middle">
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleCompletion()"
      />
    </div>
    <div class="ml-6">
      <h4 class="text-xl text-gray-900 leading-tight">{{ text }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
import { Vue, Options } from 'vue-class-component'
export interface VuexItem {
  id: number;
  text: string;
  completed: boolean;
}
@Options({
  props: {
    item: undefined,
    id: { type: Number, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, required: true }
  }
})
export default class VuexTodoItem extends Vue {
  item!: undefined
  id!: number
  text!: string
  completed!: boolean
  store = useStore()
  toggleCompletion () {
    this.store.commit(MutationType.CompleteItem, {
      id: this.id,
      completed: !this.completed
    })
  }
}
</script>
