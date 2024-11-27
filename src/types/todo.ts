export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status?: Status;
  priority?: Priority;
  searchQuery?: string;
}