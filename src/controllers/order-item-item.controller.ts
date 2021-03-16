import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {OrderItem, Item} from '../models';
import {OrderItemRepository} from '../repositories';

export class OrderItemItemController {
  constructor(
    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
  ) {}

  @get('/order-items/{id}/item', {
    responses: {
      '200': {
        description: 'Item belonging to OrderItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async getItem(
    @param.path.number('id') id: typeof OrderItem.prototype.id,
  ): Promise<Item> {
    return this.orderItemRepository.item(id);
  }
}
