import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './views/Home';
import Menu from './views/Menu';
import Order from './views/Order';
import donut0 from './donut0.jpg'
import donut1 from './donut1.jpg'
import donut2 from './donut2.jpg'
import DronutContextProvider from './contexts/DronutContext';

const donuts = [
  {
    id: 0,
    name: 'Marble-Frosted Donut',
    image: donut0,
    price: 2,
  },
  {
    id: 1,
    name: 'Old-Fashioned Donut',
    image: donut1,
    price: 2,
  },
  {
    id: 2,
    name: 'Powered Sugar Donut',
    image: donut2,
    price: 2,
  },
]

export default function App() {
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0,0,0]);
  const [orders, setOrders] = useState([[1,1,0]]);
  const [total, setTotal] = useState(0);
  const [coordinates, setCoordinates] = useState({});

  const updateAddress = (e) => setAddress(e);
  const updateCoordinates = (e) => setCoordinates(e);
  const updateOrders = () => {
    var newOrders = [];
    orders.forEach(o => newOrders.push(o));
    newOrders.push(new Array(cart[0], cart[1], cart[2]))
    setOrders(newOrders);
  }
  const increment = (id) => {
    var newCart = []
    cart.forEach(i => newCart.push(i));
    newCart[id]++;
    setCart(newCart);
  }
  const decrement = (id) => {
    if (cart[id] > 0) {
      var newCart = []
      cart.forEach(i => newCart.push(i));
      newCart[id]--;
      setCart(newCart);
    }
  }

  useEffect(() => {
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
      subtotal += cart[i] * donuts[i].price;
    }
    setTotal(subtotal);
  }, [cart])

  console.log('Address: ' + address);
  console.log('Coordinates: ' + coordinates);
  console.log('Cart: ' + cart);
  console.log('Orders: ' + orders);
  console.log('Total: ' + total);

  return (
    <DronutContextProvider value={{address, donuts, updateAddress, updateOrders, cart, increment, decrement, orders, coordinates, updateCoordinates}}>
    <Router>
      <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </div>
    </Router>
    </DronutContextProvider>
  );
}