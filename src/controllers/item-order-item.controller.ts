import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Item, OrderItem} from '../models';
import {ItemRepository} from '../repositories';

export class ItemOrderItemController {
  constructor(
    @repository(ItemRepository) protected itemRepository: ItemRepository,
  ) {}

  @get('/items/{id}/order-items', {
    responses: {
      '200': {
        description: 'Array of Item has many OrderItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderItem>,
  ): Promise<OrderItem[]> {
    return this.itemRepository.orderItems(id).find(filter);
  }

  @post('/items/{id}/order-items', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Item.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {
            title: 'NewOrderItemInItem',
            exclude: ['id'],
            optional: ['itemId'],
          }),
        },
      },
    })
    orderItem: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.itemRepository.orderItems(id).create(orderItem);
  }

  @patch('/items/{id}/order-items', {
    responses: {
      '200': {
        description: 'Item.OrderItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {partial: true}),
        },
      },
    })
    orderItem: Partial<OrderItem>,
    @param.query.object('where', getWhereSchemaFor(OrderItem))
    where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.itemRepository.orderItems(id).patch(orderItem, where);
  }

  @del('/items/{id}/order-items', {
    responses: {
      '200': {
        description: 'Item.OrderItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderItem))
    where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.itemRepository.orderItems(id).delete(where);
  }
}
