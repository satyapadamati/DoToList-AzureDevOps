import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoFilters } from '../types/todo';
import { cosmosDBService } from '../services/cosmosdb';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({});

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await cosmosDBService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTodo = {
        ...todo,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const createdTodo = await cosmosDBService.createTodo(newTodo);
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await cosmosDBService.updateTodo(id, updates);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await cosmosDBService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filters.status && todo.status !== filters.status) return false;
    if (filters.priority && todo.priority !== filters.priority) return false;
    if (filters.searchQuery) {
      const search = filters.searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(search) ||
        todo.description?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  return {
    todos: filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    filters,
    setFilters,
  };
}