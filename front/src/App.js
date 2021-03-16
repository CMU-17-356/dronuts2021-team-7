import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  ,Link
} from "react-router-dom";
import DronutContextProvider from './contexts/DronutContext';
import EmployeeDashboard from "./views/EmployeeDashboard";
import Home from './views/Home';
import Menu from './views/Menu';
import Orders from './views/Orders';
import Processing from './views/Processing';
import Status from './views/Status';

// import DronutContextProvider from './contexts/DronutContext';
// import curlirize from 'axios-curlirize';

// const axios = require('axios').default;
// export const [test,setTest] = this.setState(0);

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
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0,0,0]);
  const [orders, setOrders] = useState([]);

  // export const totalV = () => {}
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

  useEffect(() => {
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
      subtotal += cart[i] * menu[i].price;
    }
    setTotal(subtotal);
    // this.setTest(subtotal);
    // console.log(test+"TEST");
  }, [cart])

  console.log(address);
  console.log(cart);
  console.log(total);

  return (
    <DronutContextProvider value={{ address, updateAddress, cart, increment, decrement, orders, total }}>
      <Router>
        <div>


          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route path='/process/:id' render={(props) => <Processing {...props}/>}/>
            <Route path="/menu/">
              <Menu />
            </Route>

          <Route path='/status/:id/:drone/:lat/:long' render={(props) => <Status {...props}/>}/>

            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/employee">
              <EmployeeDashboard />
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