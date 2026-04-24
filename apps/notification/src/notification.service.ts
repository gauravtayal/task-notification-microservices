import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
@EventPattern('task_created')
 handleTaskCreated(data: any, context: any) {
  const channel = context.getChannelRef();
  const message = context.getMessage();

  try {
    this.sendNotification(data);
    channel.ack(message);
  } catch (err) {
    channel.nack(message);
  }
}

  sendNotification(task: any) {
    console.log(`Notification sent for task: ${task.title}`);
  }
}
