import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/tasks')
  async createTask(
    @Body() task: { title: string; deadline: string },
  ): Promise<any> {
    return this.tasksService.createTask(task);
  }
}
