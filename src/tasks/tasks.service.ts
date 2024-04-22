import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class TasksService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    @InjectRepository(TaskEntity)
    private repository: Repository<TaskEntity>
  ) {}

  async create(createTaskDto: CreateTaskDto, token) {
    try {
      await this.repository.save(createTaskDto);
      return await this.findAll(token)
      
    } catch (error) {
      throw new HttpException(
        "Заполните обязательные поля!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(token) {
    const candidate = await this.jwtService.decode(token);
    const user = await this.userService.getUserByEmail(candidate.user.email);
    const tasks = await this.repository.find({ where: { responsible: user }, relations:["responsible", "creator"] });
    let reqTask = {}
    for(let i = 0; i < tasks.length; i++){
      reqTask = tasks
      reqTask[i].deadeline = tasks[i].deadline.toLocaleDateString()
    }
    return reqTask;
  }

  async findAllSelectUser(id) {
    const user = await this.userService.findById(id);
    const tasks = await this.repository.find({ where: { responsible: user }, relations:["responsible", "creator"] });
    let reqTask = {}
    for(let i = 0; i < tasks.length; i++){
      reqTask = tasks
      reqTask[i].deadeline = tasks[i].deadline.toLocaleDateString()
    }
    return reqTask;
  }

  async findOneById(id:number) {
    const task = await this.repository.findOneBy({id: id});
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, token) {
    await this.repository.update(id, updateTaskDto)

    return await this.findAll(token)
  }

  async remove(id: number) {
    return await this.repository.delete(id)
  }
}
