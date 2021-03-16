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
import {Employee, Order} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeOrderController {
  constructor(
    @repository(EmployeeRepository)
    protected employeeRepository: EmployeeRepository,
  ) {}

  @get('/employees/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Employee has many Order',
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
    return this.employeeRepository.orders(id).find(filter);
  }

  @post('/employees/{id}/orders', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInEmployee',
            exclude: ['id'],
            optional: ['employeeId'],
          }),
        },
      },
    })
    order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.employeeRepository.orders(id).create(order);
  }

  @patch('/employees/{id}/orders', {
    responses: {
      '200': {
        description: 'Employee.Order PATCH success count',
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
    return this.employeeRepository.orders(id).patch(order, where);
  }

  @del('/employees/{id}/orders', {
    responses: {
      '200': {
        description: 'Employee.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.employeeRepository.orders(id).delete(where);
  }
}
