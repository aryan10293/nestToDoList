import { Body, Injectable } from '@nestjs/common';
import { Task } from './interface/task.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { taskDto } from './dto/creatTask.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly TaskModel: Model<Task>) {}

  async getAllTask(): Promise<Task[] | string> {
    const tasks = await this.TaskModel.find()
    if(tasks.length === 0 ){
      return 'no task found'
    } else {
      return await this.TaskModel.find();
    }
  }

  async getOneTask(id: string): Promise<Task> {
    const task = await this.TaskModel.findOne({ _id: id })
    return await this.TaskModel.findOne({ _id: id });
  }

  async postTask( task: Task): Promise<Task>{
    const newTask = await this.TaskModel.create(task)
    return newTask.save()
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.TaskModel.findByIdAndDelete(id);
  }

  async completeTask(id: string): Promise<Task> {
    console.log(id)
    return await this.TaskModel.findByIdAndUpdate(id,  { completed: true }, { new: true });
  }
}