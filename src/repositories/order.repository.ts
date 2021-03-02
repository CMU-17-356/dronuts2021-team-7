import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Order, OrderItem, OrderRelations} from '../models';
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
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
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
