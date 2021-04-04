import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
    },
  })
  line1: string;

  @property({
    type: 'string',
    required: true,
  })
  line2: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      pattern: '^[A-Za-zs-]+$',
    },
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[A-Z]{2}$',
    },
  })
  state: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
    },
  })
  zipCode: number;

  @property({
    type: 'number',
  })
  customerId?: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
