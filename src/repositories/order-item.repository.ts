import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {OrderItem, OrderItemRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class OrderItemRepository extends DefaultCrudRepository<
  OrderItem,
  typeof OrderItem.prototype.id,
  OrderItemRelations
> {

  public readonly item: BelongsToAccessor<Item, typeof OrderItem.prototype.id>;

  constructor(@inject('datasources.new') dataSource: NewDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,) {
    super(OrderItem, dataSource);
    this.item = this.createBelongsToAccessorFor('item', itemRepositoryGetter,);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
  }
}
