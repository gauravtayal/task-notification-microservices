import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  ClientsModule.register([
    {
      name:'TASK_SERVICE',
      transport: Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'task_queue',
        queueOptions: { durable: true },
      }
    }
  ])
  await app.listen(3001);
}
bootstrap();
