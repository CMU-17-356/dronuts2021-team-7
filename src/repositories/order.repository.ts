import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Order, OrderRelations, OrderItem} from '../models';
import {OrderItemRepository} from './order-item.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  public readonly orderItems: HasManyRepositoryFactory<
    OrderItem,
    typeof Order.prototype.id
  >;

  constructor(
    @inject('datasources.new') dataSource: NewDataSource,
    @repository.getter('OrderItemRepository')
    protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
  ) {
    super(Order, dataSource);
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
