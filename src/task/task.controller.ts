import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { taskDto } from './dto/creatTask.dto';
import { TaskService } from './task.service';
import { Task } from './interface/task.interface';
import { get } from 'mongoose';
@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) {}

    @Get()
      getAllTask(): Promise<Task[] | string> {
        return  this.TaskService.getAllTask()
    }

    @Get(':id')
      getOneTask(@Param('id') id:string): Promise<Task> {
        return  this.TaskService.getOneTask(id)
     }

     @Post()
        postTask(@Body() taskDto:taskDto ): Promise<Task> {
            return this.TaskService.postTask(taskDto)
        }
    @Put(':id')
        completeTask(@Param('id') id:string): Promise<Task>{
          return this.TaskService.completeTask(id)
        }
     
    @Delete(':id')
        deleteTask(@Param('id') id:string): Promise<Task>{
          return this.TaskService.deleteTask(id)
        }
}
