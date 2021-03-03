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
import {Customer, Address} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerAddressController {
  constructor(
    @repository(CustomerRepository)
    protected customerRepository: CustomerRepository,
  ) {}

  @get('/customers/{id}/addresses', {
    responses: {
      '200': {
        description: 'Array of Customer has many Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Address)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.customerRepository.addresses(id).find(filter);
  }

  @post('/customers/{id}/addresses', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInCustomer',
            exclude: ['id'],
            optional: ['customerId'],
          }),
        },
      },
    })
    address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.customerRepository.addresses(id).create(address);
  }

  @patch('/customers/{id}/addresses', {
    responses: {
      '200': {
        description: 'Customer.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address))
    where?: Where<Address>,
  ): Promise<Count> {
    return this.customerRepository.addresses(id).patch(address, where);
  }

  @del('/customers/{id}/addresses', {
    responses: {
      '200': {
        description: 'Customer.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address))
    where?: Where<Address>,
  ): Promise<Count> {
    return this.customerRepository.addresses(id).delete(where);
  }
}
