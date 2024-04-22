import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  header: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  deadline: Date;

  @Column({ default: "Средний" })
  priority: string;

  @Column({ default: "К выполнению" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.taskCreator, { nullable: false })
  @JoinColumn()
  creator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.taskResponsible, {
    nullable: false,
  })
  @JoinColumn()
  responsible: UserEntity;
}
