// src/common/repositories/base.abstract.repository.ts
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { AbstractEntityType } from '../entities/abstract.entity';

export abstract class AbstractRepository<T extends AbstractEntityType> {
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

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Add custom methods that all repositories will inherit
  async findWithRelations(relations: string[]): Promise<T[]> {
    return await this.repository.find({
      relations: relations
    });
  }
}