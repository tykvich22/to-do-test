import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parseTodos = JSON.parse(storedTodos);
      if (parseTodos.length > 0) {
        todos.value = parseTodos;
      } else {
        todos.value = [
          {
            id: Date.now(),
            text: 'Первая задача',
            isComplete: false,
          },
        ];
      }
    } else {
      todos.value = [
        {
          id: Date.now(),
          text: 'Первая задача',
          isComplete: false,
        },
      ];
    }
  };

  const saveTodos = (): void => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  loadTodos();

  const addTodo = (text: string) => {
    todos.value.push({
      id: Date.now(),
      text,
      isComplete: false,
    });
    saveTodos();
  };

  const toggleComplete = (id: number) => {
    const todo = todos.value.find((item) => item.id === id);

    if (todo) {
      !todo.isComplete;
    }
    saveTodos();
  };

  const updateTodo = (id: number, text: string) => {
    const todo = todos.value.find((item) => item.id === id);

    if (todo) {
      todo.text = text;
    }
    saveTodos();
  };

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((item) => item.id !== id);
    saveTodos();
  };

  return {
    todos,
    addTodo,
    toggleComplete,

    updateTodo,
    removeTodo,
  };
});
