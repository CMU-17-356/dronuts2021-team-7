import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Order, OrderRelations, OrderItem, Address} from '../models';
import {OrderItemRepository} from './order-item.repository';
import {AddressRepository} from './address.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  public readonly orderItems: HasManyRepositoryFactory<
    OrderItem,
    typeof Order.prototype.id
  >;

  public readonly address: BelongsToAccessor<
    Address,
    typeof Order.prototype.id
  >;

  constructor(
    @inject('datasources.new') dataSource: NewDataSource,
    @repository.getter('OrderItemRepository')
    protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Order, dataSource);
    this.address = this.createBelongsToAccessorFor(
      'address',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.orderItems = this.createHasManyRepositoryFactoryFor(
      'orderItems',
      orderItemRepositoryGetter,
    );
    this.registerInclusionResolver(
      'orderItems',
      this.orderItems.inclusionResolver,
    );
  }
}
