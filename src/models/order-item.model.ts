import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderItem extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
  })
  orderId: number;

  @property({
    type: 'number',
  })
  itemId: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
