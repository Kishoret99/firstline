import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('group')
export class Group {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @ManyToMany(() => Account, (account) => account.groups)
  accounts: Account[];
}
