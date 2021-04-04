import {Entity, hasMany, model, property} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Drone extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Order)
  orders: Order[];

  constructor(data?: Partial<Drone>) {
    super(data);
  }
}

export interface DroneRelations {
  // describe navigational properties here
}

export type DroneWithRelations = Drone & DroneRelations;
