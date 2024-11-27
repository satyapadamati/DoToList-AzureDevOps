import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Todo } from '../../types/todo';
import { priorityColors, statusColors } from '../../utils/colors';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Todo['status']) => void;
}

export function TodoItem({ todo, onDelete, onStatusChange }: TodoItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
          {todo.description && (
            <p className="mt-1 text-gray-600">{todo.description}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', priorityColors[todo.priority])}>
              {todo.priority}
            </span>
            <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', statusColors[todo.status])}>
              {todo.status}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <select
            value={todo.status}
            onChange={(e) => onStatusChange(todo.id, e.target.value as Todo['status'])}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}