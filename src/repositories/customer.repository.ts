import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Customer, CustomerRelations, Order, Address} from '../models';
import {OrderRepository} from './order.repository';
import {AddressRepository} from './address.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Customer.prototype.id
  >;

  public readonly addresses: HasManyRepositoryFactory<
    Address,
    typeof Customer.prototype.id
  >;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Customer, dataSource);
    this.addresses = this.createHasManyRepositoryFactoryFor(
      'addresses',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver(
      'addresses',
      this.addresses.inclusionResolver,
    );
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
