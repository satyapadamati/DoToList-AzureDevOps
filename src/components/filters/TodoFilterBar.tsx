import React from 'react';
import { SearchInput } from './SearchInput';
import { FilterSelect } from './FilterSelect';
import { TodoFilters } from '../../types/todo';

interface TodoFilterBarProps {
  filters: TodoFilters;
  onFilterChange: (filters: TodoFilters) => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export function TodoFilterBar({ filters, onFilterChange }: TodoFilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center space-x-4">
        <SearchInput
          value={filters.searchQuery || ''}
          onChange={(value) => onFilterChange({ ...filters, searchQuery: value })}
          placeholder="Search todos..."
        />
        <FilterSelect
          value={filters.status || ''}
          onChange={(value) => onFilterChange({ ...filters, status: value as TodoFilters['status'] })}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          value={filters.priority || ''}
          onChange={(value) => onFilterChange({ ...filters, priority: value as TodoFilters['priority'] })}
          options={PRIORITY_OPTIONS}
        />
      </div>
    </div>
  );
}