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
import {Drone, Order} from '../models';
import {DroneRepository} from '../repositories';

export class DroneOrderController {
  constructor(
    @repository(DroneRepository) protected droneRepository: DroneRepository,
  ) {}

  @get('/drones/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Drone has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.droneRepository.orders(id).find(filter);
  }

  @post('/drones/{id}/orders', {
    responses: {
      '200': {
        description: 'Drone model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Drone.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInDrone',
            exclude: ['id'],
            optional: ['droneId'],
          }),
        },
      },
    })
    order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.droneRepository.orders(id).create(order);
  }

  @patch('/drones/{id}/orders', {
    responses: {
      '200': {
        description: 'Drone.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.droneRepository.orders(id).patch(order, where);
  }

  @del('/drones/{id}/orders', {
    responses: {
      '200': {
        description: 'Drone.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.droneRepository.orders(id).delete(where);
  }
}
