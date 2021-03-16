import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Drone, DroneRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class DroneRepository extends DefaultCrudRepository<
  Drone,
  typeof Drone.prototype.id,
  DroneRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Drone.prototype.id>;

  constructor(@inject('datasources.new') dataSource: NewDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,) {
    super(Drone, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
