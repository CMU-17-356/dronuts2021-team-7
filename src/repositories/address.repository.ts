import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Address, AddressRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Address.prototype.id
  >;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Address, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
