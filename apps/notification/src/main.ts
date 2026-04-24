import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationModule,{
    transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'task_queue',
    noAck: false, // IMPORTANT
  },
})
  await app.listen();
}
bootstrap();
