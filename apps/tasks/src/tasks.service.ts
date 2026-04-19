import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class TasksService {
  async createTask(task: { title: string; deadline: string }): Promise<any> {
    // Implement task creation logic here
    let connection: Connection | null = null;
    try {
      connection = await connect('amqp://localhost');
      const channel: Channel = await connection.createChannel();
      const queue = 'tasks_notifications';
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)));

      return { message: 'Task created successfully', task };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}
