import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './views/Home';
import Menu from './views/Menu';
import Orders from './views/Orders';

import DronutContextProvider from './contexts/DronutContext';

const menu = [
  {
    price: 2
  },
  {
    price: 2
  },
  {
    price: 2
  },
]

export default function App() {
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0,0,0]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const updateAddress = (e) => setAddress(e);
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
      subtotal += cart[i] * menu[i].price;
    }
    setTotal(subtotal);
  }, [cart])

  console.log(address);
  console.log(cart);
  console.log(total);

  return (
    <DronutContextProvider value={{address, updateAddress, cart, increment, decrement, orders}}>
    <Router>
      <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/orders">
              <Orders />
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