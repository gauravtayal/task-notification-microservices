import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: rabbitConfig,
      },
    ]),
  ],
  providers: [TasksService],
  controllers:[TasksController]
})
export class TasksModule {}
