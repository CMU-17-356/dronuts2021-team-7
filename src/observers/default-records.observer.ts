import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {Address, Customer} from '../models';
import {
  AddressRepository,
  CustomerRepository,
  ItemRepository
} from '../repositories';

const axios = require('axios').default;

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class DefaultRecordsObserver implements LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @inject('repositories.CustomerRepository')
    private customerRepo: CustomerRepository,
    @inject('repositories.AddressRepository')
    private addressRepo: AddressRepository,
    @inject('repositories.ItemRepository') private itemRepo: ItemRepository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    const customer = new Customer({
      username: 'johndoe',
      password: 'secret',
      firstName: 'John',
      lastName: 'Doe',
      emailId: 'john@example.com',
    });
    const custResult = await this.customerRepo.create(customer);
    const address = new Address({
      line1: '5032 Forbes Ave',
      line2: 'SMC 1234',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: 15289,
      customerId: custResult.id,
    });
    const addrResult = await this.addressRepo.create(address);

    const item1 = {
      name: 'Marble-Frosted Donut',
      description: 'Another donut',
      price: 2,
      qtyAvailable: 10,
    };
    const item1Res = await this.itemRepo.create(item1);

    const item2 = {
      name: 'Old-Fashioned Donut',
      description: 'Another donut',
      price: 2,
      qtyAvailable: 10,
    };
    const item2Res = await this.itemRepo.create(item2);

    const item3 = {
      name: 'Powdered Sugar Donut',
      description: 'Another donut',
      price: 2,
      qtyAvailable: 10,
    };
    const item3Res = await this.itemRepo.create(item3);


    console.log('Created address ', addrResult);
    console.log('Created customer ', this.customerRepo.findById(custResult.id));
    console.log('Created item ', item1Res);
    console.log('Created item ', item2Res);
    console.log('Created item ', item3Res);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
