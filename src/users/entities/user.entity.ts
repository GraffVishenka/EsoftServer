import { TaskEntity } from "src/tasks/entities/task.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  deportament: string;

  @OneToMany(() => TaskEntity, (task) => task.creator,)
  taskCreator: TaskEntity[];

  @OneToMany(() => TaskEntity, (task) => task.responsible, )
  taskResponsible: TaskEntity[];


  @Column({ nullable: false })
  role: string;
}

