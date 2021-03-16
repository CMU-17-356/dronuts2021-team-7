import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Employee, EmployeeRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Employee.prototype.id>;

  constructor(@inject('datasources.new') dataSource: NewDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,) {
    super(Employee, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
