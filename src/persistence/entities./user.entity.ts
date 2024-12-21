import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ length: 12 })
  username: string;

  @Column()
  password: string;
}
