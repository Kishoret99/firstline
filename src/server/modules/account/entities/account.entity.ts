import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Group } from './group.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @ManyToMany(() => Group, (group) => group.accounts)
  @JoinTable()
  groups: Group[];

  @Column({ type: 'varchar', nullable: true, default: 'user' })
  role: string;
}
