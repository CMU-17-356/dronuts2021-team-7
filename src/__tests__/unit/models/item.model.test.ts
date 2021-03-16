import {expect} from '@loopback/testlab';
import {Item} from '../../../models';

describe('Item (unit)', () => {
  const cust = new Item({
    id: 1,
    name: 'Ayaan',
    description: 'Hussain',
    price: 2,
    qtyAvailable: 4,
  });
  it('stores name correctly', () => {
    expect(cust.name).to.equal('Ayaan');
  });
  it('stores last name correctly', () => {
    expect(cust.description).to.equal('Hussain');
  });
  it('stores id correctly', () => {
    expect(cust.id).to.equal(1);
  });
  it('stores price correctly', () => {
    expect(cust.price).to.equal(2);
  });
  it('stores quantity correctly', () => {
    expect(cust.qtyAvailable).to.equal(4);
  });
});
