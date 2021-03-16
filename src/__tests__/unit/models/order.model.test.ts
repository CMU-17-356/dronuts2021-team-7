import {expect} from '@loopback/testlab';
import {Order} from '../../../models';

describe('Order (unit)', () => {
  const dateD = new Date(1, 2, 3);
  const cust = new Order({
    id: 1,
    date: dateD,
    customerId: 1,
    droneId: 2,
    employeeAssigned: 3,
  });
  it('stores id correctly', () => {
    expect(cust.id).to.equal(1);
  });
  it('stores customer id stored correctly', () => {
    expect(cust.customerId).to.equal(1);
  });
  it('stores drone id stored correctly', () => {
    expect(cust.droneId).to.equal(2);
  });
  it('stores employee id stored correctly', () => {
    expect(cust.employeeAssigned).to.equal(3);
  });
  it('Date assigned correctly', () => {
    expect(cust.date).to.equal(dateD);
  });
});
