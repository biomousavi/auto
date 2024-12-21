import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Place } from './place.entity';

@Entity('cities')
export class City extends AbstractEntity {
  @Column()
  postCode: string;

  @Column()
  country: string;

  @OneToMany(() => Place, (place) => place.city, { cascade: true })
  places: Place[];

  @ManyToOne(() => User)
  user: User;
}
