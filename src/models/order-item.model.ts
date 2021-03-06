import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class OrderItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
  })
  quantity: number;

  @property({
    type: 'number',
  })
  orderId?: number;

  @belongsTo(() => Item)
  itemId: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
