<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { todos } = storeToRefs(store);

const newTodo = ref('');

const addNewTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value);
    newTodo.value = '';
  }
};

const toggleComplete = (id: number) => {
  store.toggleComplete(id);
};

const removeTodo = (id: number) => {
  store.removeTodo(id);
};

const updateText = (id: number, text: string) => {
  store.updateTodo(id, text);
};
</script>

<template>
  <q-input
    v-model="newTodo"
    placeholder="Введите новую задачу..."
    filled
    @keyup.enter="addNewTodo"
    @blur="addNewTodo"></q-input>

  <q-list bordered class="q-mt-lg">
    <q-item v-for="todo in todos" :key="todo.id" clickable>
      <q-item-section avatar>
        <q-checkbox
          v-model="todo.isComplete"
          @update:model-value="toggleComplete(todo.id)"></q-checkbox>
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="todo.text"
          filled
          dense
          class="col"
          :class="{ 'line-through': todo.isComplete }"
          @blur="updateText(todo.id, todo.text)" />
      </q-item-section>
      <q-item-section side>
        <q-btn color="secondary" icon="delete" flat @click="removeTodo(todo.id)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
