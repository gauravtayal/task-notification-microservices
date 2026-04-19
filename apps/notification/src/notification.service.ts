import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class NotificationService implements OnModuleInit {
  async onModuleInit() {
    // Implement logic to connect to RabbitMQ and consume messages from the queue
    // For example, you can use amqplib to connect and consume messages
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'tasks_notifications';
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
      if (msg) {
        const task = JSON.parse(msg.content.toString());
        console.log('Received task notification:', task);
        // Implement logic to send email notification here
        channel.ack(msg);
      }
    });
  }
}
