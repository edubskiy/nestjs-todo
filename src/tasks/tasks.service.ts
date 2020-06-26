import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { create } from 'domain';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDTO;
  //   let tasks = this.getAllTasks();
  //   if (status != null) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search != null) {
  //     tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find(task => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }
  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, newStatus: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = newStatus;
  //   return task;
  // }
}
