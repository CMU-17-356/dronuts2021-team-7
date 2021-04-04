import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Address} from './address.model';
import {OrderItem} from './order-item.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    jsonSchema: {},
    defaultFn: 'now',
  })
  date: Date;

  @hasMany(() => OrderItem)
  orderItems: OrderItem[];

  @property({
    type: 'number',
  })
  customerId?: number;

  @property({
    type: 'number',
  })
  droneId?: number;

  @property({
    type: 'number',
  })
  employeeId?: number;

  @belongsTo(() => Address)
  addressId: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
