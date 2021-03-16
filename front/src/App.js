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
import donut3 from './donut3.jpg'
import donut4 from './donut4.jpg'
import donut5 from './donut5.jpg'
import donut6 from './donut6.jpg'
import donut7 from './donut7.jpg'
import donut8 from './donut8.jpg'
import donut9 from './donut9.jpg'
import donut10 from './donut10.jpg'
import donut11 from './donut11.jpg'
import DronutContextProvider from './contexts/DronutContext';

const donuts = [
  {
    id: 0,
    name: 'Apple-Crumb Donut',
    image: donut0,
    price: 2,
  },
  {
    id: 1,
    name: 'Bavarian Kreme-Filled Donut',
    image: donut1,
    price: 2,
  },
  {
    id: 2,
    name: 'Boston Kreme Pie Donut',
    image: donut2,
    price: 2,
  },
  {
    id: 3,
    name: 'Chocolate Kreme-Filled Donut',
    image: donut3,
    price: 2,
  },
  {
    id: 4,
    name: 'Chocolate-Frosted Donut',
    image: donut4,
    price: 2,
  },
  {
    id: 5,
    name: 'Chocolate-Glazed Cake Donut',
    image: donut5,
    price: 2,
  },
  {
    id: 6,
    name: 'Cinnamon-Sugar Donut',
    image: donut6,
    price: 2,
  },
  {
    id: 7,
    name: 'Marble-Frosted Donut',
    image: donut7,
    price: 2,
  },
  {
    id: 8,
    name: 'Old-Fashioned Donut',
    image: donut8,
    price: 2,
  },
  {
    id: 9,
    name: 'Powered Sugar Donut',
    image: donut9,
    price: 2,
  },
  {
    id: 10,
    name: 'Strawberry-Frosted Donut',
    image: donut10,
    price: 2,
  },
  {
    id: 11,
    name: 'Vanilla-Frosted Donut',
    image: donut11,
    price: 2,
  },
]

export default function App() {
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0,0,0]);
  const [coordinates, setCoordinates] = useState({});
  const [orders, setOrders] = useState([{0:1,1:1,2:1}]);
  const [orderID, setOrderID] = useState(0);
  const [total, setTotal] = useState(0);

  const updateAddress = (e) => setAddress(e);
  const updateCoordinates = (e) => setCoordinates(e);
  const updateOrders = () => {
    console.log("updating orders")
    var newOrders = [];
    orders.forEach(o => newOrders.push(o));
    newOrders.push({0:cart[0], 1:cart[1], 2:cart[2]})
    setOrders(newOrders);
    updateOrderID(orders.length);
  }
  const updateOrderID = (e) => {
    console.log("updating order id " + e)
    if (e) {
      setOrderID(e);
    }
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
    <DronutContextProvider value={{address, donuts, updateAddress, updateOrders, cart, increment, decrement, orderID, orders, coordinates, updateCoordinates, updateOrderID}}>
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