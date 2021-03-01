import {Entity, hasMany, model, property} from '@loopback/repository';
import {OrderItem} from './order-item.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
  })
  customerId: number;

  @hasMany(() => OrderItem)
  orderItems: OrderItem[];

  @property({
    type: 'number',
  })
  droneId?: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
