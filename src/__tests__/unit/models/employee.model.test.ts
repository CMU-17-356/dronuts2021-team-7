import {expect} from '@loopback/testlab';
import {Employee} from '../../../models';


describe('Employee (unit)', () => {
  const cust = new Employee({id: 1, firstName: "Ayaan", lastName: "Hussain"})
  it('stores name correctly', () => {
    expect(cust.firstName).to.equal('Ayaan');
  });
  it('stores last name correctly', () => {
    expect(cust.lastName).to.equal('Hussain');
  });
  it('stores id correctly', () => {
    expect(cust.id).to.equal(1);
  });
});
