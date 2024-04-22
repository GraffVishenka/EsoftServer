import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Req,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";


@Controller("tasks")
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req:Request) {
    return this.tasksService.create(createTaskDto,req.headers.authorization.split(" ")[1]);
  }

  @Get("findAll/:id")
  findAllMyTasks(@Param("id") id: number) {
    return this.tasksService.findAllSelectUser(id);
  }
  
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateTaskDto: UpdateTaskDto, @Req() req:Request) {
    return this.tasksService.update(id, updateTaskDto, req.headers.authorization.split(" ")[1]);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
