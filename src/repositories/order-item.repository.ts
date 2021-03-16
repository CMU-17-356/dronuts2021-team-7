import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {OrderItem, OrderItemRelations} from '../models';

export class OrderItemRepository extends DefaultCrudRepository<
  OrderItem,
  typeof OrderItem.prototype.id,
  OrderItemRelations
> {
  constructor(@inject('datasources.new') dataSource: NewDataSource) {
    super(OrderItem, dataSource);
  }
}
