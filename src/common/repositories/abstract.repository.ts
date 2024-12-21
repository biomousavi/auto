// src/common/repositories/base.abstract.repository.ts
import { Repository, DeepPartial, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findOneById(id: number): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id as any,
    };
    return await this.repository.findOneBy(options);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async findAll(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Add custom methods that all repositories will inherit
  async findWithRelations(relations: string[]): Promise<T[]> {
    return await this.repository.find({
      relations: relations,
    });
  }
}
