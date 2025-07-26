// ✅ File: lib/useTodoStore.js
import { create } from 'zustand';

const LOCAL_STORAGE_KEY = 'synced_todos';

const loadTodos = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const useTodoStore = create((set, get) => ({
  todos: loadTodos(),

  addTodo: (text, deadline) => {
    const newTodo = {
      id: Date.now(),
      text,
      deadline, // Date string
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().todos, newTodo];
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },

  toggleComplete: (id) => {
    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },

  restoreTodo: (id) => {
    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: false } : todo
    );
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },

  deleteTodo: (id) => {
    const updated = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },
}));