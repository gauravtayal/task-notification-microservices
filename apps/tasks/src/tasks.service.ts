import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Connection } from 'amqplib';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_SERVICE') private client: ClientProxy,
  ) {}
  async createTask(task: { title: string; deadline: string }): Promise<any> {
    // Implement task creation logic here
    let connection: Connection | null = null;
    try {
      // Connect to RabbitMQ and publish the task notification
      console.log('Task Created:', task);
      this.client.emit('task_created', task);
      return { message: 'Task created successfully', task };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}
