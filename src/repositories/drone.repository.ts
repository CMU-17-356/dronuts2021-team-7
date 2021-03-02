import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Drone, DroneRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class DroneRepository extends DefaultCrudRepository<
  Drone,
  typeof Drone.prototype.id,
  DroneRelations
> {
  public readonly order: HasOneRepositoryFactory<
    Order,
    typeof Drone.prototype.id
  >;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Drone, dataSource);
    this.order = this.createHasOneRepositoryFactoryFor(
      'order',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
