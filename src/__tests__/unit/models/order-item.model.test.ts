import {expect} from '@loopback/testlab';
import {OrderItem} from '../../../models';

describe('Order-Item (unit)', () => {
  const cust = new OrderItem({id: 1, quantity: 3, orderId: 1, itemId: 1});
  it('stores id correctly', () => {
    expect(cust.id).to.equal(1);
  });
  it('stores item id correctly', () => {
    expect(cust.itemId).to.equal(1);
  });
  it('stores order id correctly', () => {
    expect(cust.orderId).to.equal(1);
  });
  it('stores quantity correctly', () => {
    expect(cust.quantity).to.equal(3);
  });
});
