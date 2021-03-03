import {expect} from '@loopback/testlab';
import {Drone} from '../../../models';

describe('Drone (unit)', () => {
  const drone = new Drone({id: 1});
  it('stores id correctly', () => {
    expect(drone.id).to.equal(1);
  });
});
