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

export default function App() {
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0]);
  const [orders, setOrders] = useState([]);

  const updateAddress = (e) => setAddress(e.target.value);
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

  console.log(address);
  console.log(cart);

  return (
    <DronutContextProvider value={{address, updateAddress, cart, increment, decrement, orders}}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </nav>

        
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