import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Drone} from '../models';
import {DroneRepository} from '../repositories';

export class DroneController {
  constructor(
    @repository(DroneRepository)
    public droneRepository : DroneRepository,
  ) {}

  @post('/drones')
  @response(200, {
    description: 'Drone model instance',
    content: {'application/json': {schema: getModelSchemaRef(Drone)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drone, {
            title: 'NewDrone',
            exclude: ['id'],
          }),
        },
      },
    })
    drone: Omit<Drone, 'id'>,
  ): Promise<Drone> {
    return this.droneRepository.create(drone);
  }

  @get('/drones/count')
  @response(200, {
    description: 'Drone model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Drone) where?: Where<Drone>,
  ): Promise<Count> {
    return this.droneRepository.count(where);
  }

  @get('/drones')
  @response(200, {
    description: 'Array of Drone model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Drone, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Drone) filter?: Filter<Drone>,
  ): Promise<Drone[]> {
    return this.droneRepository.find(filter);
  }

  @patch('/drones')
  @response(200, {
    description: 'Drone PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drone, {partial: true}),
        },
      },
    })
    drone: Drone,
    @param.where(Drone) where?: Where<Drone>,
  ): Promise<Count> {
    return this.droneRepository.updateAll(drone, where);
  }

  @get('/drones/{id}')
  @response(200, {
    description: 'Drone model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Drone, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Drone, {exclude: 'where'}) filter?: FilterExcludingWhere<Drone>
  ): Promise<Drone> {
    return this.droneRepository.findById(id, filter);
  }

  @patch('/drones/{id}')
  @response(204, {
    description: 'Drone PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drone, {partial: true}),
        },
      },
    })
    drone: Drone,
  ): Promise<void> {
    await this.droneRepository.updateById(id, drone);
  }

  @put('/drones/{id}')
  @response(204, {
    description: 'Drone PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() drone: Drone,
  ): Promise<void> {
    await this.droneRepository.replaceById(id, drone);
  }

  @del('/drones/{id}')
  @response(204, {
    description: 'Drone DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.droneRepository.deleteById(id);
  }
}
