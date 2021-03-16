import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NewDataSource} from '../datasources';
import {Drone, DroneRelations} from '../models';

export class DroneRepository extends DefaultCrudRepository<
  Drone,
  typeof Drone.prototype.id,
  DroneRelations
> {
  constructor(@inject('datasources.new') dataSource: NewDataSource) {
    super(Drone, dataSource);
  }
}
