import { BaseInterfaceRepository } from '@repositories/base/base.interface.repository';
import { DeleteResult, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
    return this.entity.save(data);
  }

  public async findOneById(id: number): Promise<T> {
    const condition = { id } as any;
    return this.entity.findOne({
      where: condition,
    });
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return this.entity.findOne({ where: filterCondition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return this.entity.find(relations);
  }

  public async findAll(): Promise<T[]> {
    return this.entity.find();
  }

  public async remove(id: string): Promise<DeleteResult> {
    return this.entity.delete(id);
  }
}
