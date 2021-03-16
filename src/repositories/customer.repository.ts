import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Customer, CustomerRelations, Address, Order} from '../models';
import {AddressRepository} from './address.repository';
import {OrderRepository} from './order.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly addresses: HasManyRepositoryFactory<
    Address,
    typeof Customer.prototype.id
  >;

  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Customer.prototype.id
  >;

  constructor(
    @inject('datasources.new') dataSource: NewDataSource,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Customer, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.addresses = this.createHasManyRepositoryFactoryFor(
      'addresses',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver(
      'addresses',
      this.addresses.inclusionResolver,
    );
  }
}
