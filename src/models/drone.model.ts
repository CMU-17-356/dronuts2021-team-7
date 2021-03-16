import {Entity, model, property} from '@loopback/repository';

@model()
export class Drone extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;


  constructor(data?: Partial<Drone>) {
    super(data);
  }
}

export interface DroneRelations {
  // describe navigational properties here
}

export type DroneWithRelations = Drone & DroneRelations;
