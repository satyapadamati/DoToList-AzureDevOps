import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/todo/TodoItem';
import { TodoFilterBar } from './components/filters/TodoFilterBar';
import { useTodos } from './hooks/useTodos';

function App() {
  const [showForm, setShowForm] = useState(false);
  const { todos, addTodo, updateTodo, deleteTodo, filters, setFilters } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Todo
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <TodoForm
              onSubmit={(todo) => {
                addTodo(todo);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TodoFilterBar filters={filters} onFilterChange={setFilters} />

        <div className="mt-6 space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onStatusChange={(id, status) => updateTodo(id, { status })}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No todos found. Add some tasks to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;