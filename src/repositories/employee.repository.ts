import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Employee, EmployeeRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  public readonly ordersAssigned: HasManyRepositoryFactory<
    Order,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Employee, dataSource);
    this.ordersAssigned = this.createHasManyRepositoryFactoryFor(
      'ordersAssigned',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver(
      'ordersAssigned',
      this.ordersAssigned.inclusionResolver,
    );
  }
}
