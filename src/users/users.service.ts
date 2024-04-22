import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    return this.repository.save(CreateUserDto);
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.findOneBy({ email:email });
    return user;
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async remove(id: number) {
    try {
      const candidate = await this.repository.findOne({ where: { id: id } });
      if (candidate) {
        await this.repository.delete({ id: id });
        return "Пользователь удалён";
      }
      return "Пользователь не найден";
    } catch {
      throw Error;
    }
  }

  async getAllMyUsers(token) {
    const dep = await this.jwtService.decode(token);
    const users = await this.repository.find({
     where: { deportament: dep.user.deportament },
    });
    
    return users;
  }
}
