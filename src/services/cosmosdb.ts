import { CosmosClient } from '@azure/cosmos';
import { cosmosConfig } from '../config/database';
import { Todo } from '../types/todo';

class CosmosDBService {
  private client: CosmosClient;
  private database: any;
  private container: any;

  constructor() {
    this.client = new CosmosClient({
      endpoint: cosmosConfig.endpoint,
      key: cosmosConfig.key,
    });
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    this.database = this.client.database(cosmosConfig.databaseId);
    this.container = this.database.container(cosmosConfig.containerId);
  }

  async getAllTodos(): Promise<Todo[]> {
    const querySpec = {
      query: "SELECT * FROM c"
    };
    
    const { resources: todos } = await this.container.items
      .query(querySpec)
      .fetchAll();
    
    return todos;
  }

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const { resource: createdTodo } = await this.container.items.create(todo);
    return createdTodo;
  }

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const { resource: existingTodo } = await this.container.item(id, id).read();
    const updatedTodo = {
      ...existingTodo,
      ...todo,
      updatedAt: new Date().toISOString()
    };
    
    const { resource: result } = await this.container
      .item(id, id)
      .replace(updatedTodo);
    
    return result;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.container.item(id, id).delete();
  }
}

export const cosmosDBService = new CosmosDBService();