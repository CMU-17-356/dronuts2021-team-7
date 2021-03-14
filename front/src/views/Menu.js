import { useContext } from 'react';
import { Button } from '@material-ui/core';

import MenuItem from './MenuItem';
import donutimage from '../donut.jpg';
import { DronutContext } from '../contexts/DronutContext';

export default function Menu() {

  const { address } = useContext(DronutContext);

  const donuts = [
    {
      id: 0,
      title: 'The Donut',
      image: donutimage,
      price: 2,
    }
  ]

  const menu = donuts.map(donut => <li><MenuItem donut={donut}/></li>);

  return (
    <div>
      <div>Delivery to: { address }</div>    
      <div>
        <ul>
          {menu}
        </ul>
      </div>
      <Button href='/orders'>Check out</Button>
    </div>
  );
}