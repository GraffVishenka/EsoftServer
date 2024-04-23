import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Request,
  UseGuards,
  Patch,
  Delete
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("tasks")
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({summary:"Получение всех задач"})
  @ApiResponse({status:200, type:TaskEntity})
  @Get("findAll/:id")
  findAllMyTasks(@Param("id") id: number) {
    return this.tasksService.findAllSelectUser(id);
  }

  @ApiOperation({summary:"Получение задачи по id"})
  @ApiResponse({status:200, type:TaskEntity})
  @Get("findOne/:id")
  findOneById(@Param("id") id: number) {
    return this.tasksService.findOneById(id);
  }

  @ApiOperation({summary:"Создание новой задачи"})
  @ApiResponse({status:200, type:TaskEntity})
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.body.email)
  }

  @ApiOperation({summary:"Редактирование задачи"})
  @ApiResponse({status:200, type:TaskEntity})
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    console.log(updateTaskDto)
    return this.tasksService.update(id, updateTaskDto, req.user.user.email);
  }

  @ApiOperation({summary:"Удаление задачи по id"})
  @ApiResponse({status:200})
  @Delete(":id")
  remove(@Param("id") id: number, @Request() req) {
    return this.tasksService.remove(id, req.user.user.email);
  }
}
