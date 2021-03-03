import {expect} from '@loopback/testlab';
import {Customer} from '../../../models';

describe('Customer (unit)', () => {
  const cust = new Customer({
    id: 1,
    firstName: 'Ayaan',
    lastName: 'Hussain',
    emailId: 'ayaanh@cmu.edu',
  });
  it('stores name correctly', () => {
    expect(cust.firstName).to.equal('Ayaan');
  });
  it('stores last name correctly', () => {
    expect(cust.lastName).to.equal('Hussain');
  });
  it('stores id correctly', () => {
    expect(cust.id).to.equal(1);
  });
  it('stores email correctly', () => {
    expect(cust.emailId).to.equal('ayaanh@cmu.edu');
  });
});
