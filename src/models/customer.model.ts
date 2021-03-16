import {Entity, model, property} from '@loopback/repository';

const EMAIL_VALIDATION_REGEX =
  '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])).){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$';

const PASSWORD_VALIDATION_REGEX = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: PASSWORD_VALIDATION_REGEX,
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    pattern: EMAIL_VALIDATION_REGEX,
  })
  emailId: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
