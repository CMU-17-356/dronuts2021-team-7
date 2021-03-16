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
import {
  Order,
  OrderItem,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderOrderItemController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Array of Order has many OrderItem',
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
    return this.orderRepository.orderItems(id).find(filter);
  }

  @post('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {
            title: 'NewOrderItemInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) orderItem: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.orderRepository.orderItems(id).create(orderItem);
  }

  @patch('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order.OrderItem PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.orderRepository.orderItems(id).patch(orderItem, where);
  }

  @del('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order.OrderItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.orderRepository.orderItems(id).delete(where);
  }
}
