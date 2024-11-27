import React from 'react';
import { Search } from 'lucide-react';
import { TodoFilters } from '../types/todo';

interface TodoFiltersProps {
  filters: TodoFilters;
  onFilterChange: (filters: TodoFilters) => void;
}

export function TodoFilters({ filters, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search todos..."
              value={filters.searchQuery || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <select
          value={filters.status || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: e.target.value as TodoFilters['status'],
            })
          }
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filters.priority || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priority: e.target.value as TodoFilters['priority'],
            })
          }
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}