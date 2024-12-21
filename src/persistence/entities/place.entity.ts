import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { City } from './city.entity';

@Entity('places')
export class Place extends AbstractEntity {
  @Column()
  placeName: string;

  @Column()
  state: string;

  @Column()
  abbreviation: string;

  @ManyToOne(() => City, (city) => city.places)
  city: City;
}
