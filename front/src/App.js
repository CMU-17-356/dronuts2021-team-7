import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import DronutContextProvider from './contexts/DronutContext';
import donut0 from './donut0.jpg';
import donut1 from './donut1.jpg';
import donut2 from './donut2.jpg';
import donut3 from './donut3.jpg';
import donut4 from './donut4.jpg';
import donut5 from './donut5.jpg';
import donut6 from './donut6.jpg';
import donut7 from './donut7.jpg';
import donut8 from './donut8.jpg';
import EmployeeDashboard from './views/EmployeeDashboard';
import Home from './views/Home';
import Edit from './views/Edit';

import Menu from './views/Menu';
import Order from './views/Order';
import Processing from './views/Processing';


// const info = async () => {  }
// getInfo();
// const into = getInfo();



export default function App() {


  const [info, setInfo] = React.useState([]);

  async function getI() {
    await fetch("http://dronuts7.azurewebsites.net/items").then(function (resp) { return resp.json(); }).then(function (data) { setInfo(data) })
    // try { console.log("PRice =", info[0]["price"]) } catch { }
  }
  getI()
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
    }
  ]


  // getI()
  try {
    const inf = info[0].price
    donuts.push({
      id: 7,
      name: 'Marble-Frosted Donut',
      image: donut7,
      price: inf,
    })
  } catch {
    donuts.push({
      id: 7,
      name: 'Marble-Frosted Donut',
      image: donut7,
      price: 2,
    })
  }
  try {
    const inf = info[1].price
    donuts.push({
      id: 8,
      name: 'Old-Fashioned Donut',
      image: donut8,
      price: inf,
    })
  } catch {
    donuts.push({
      id: 8,
      name: 'Old-Fashioned Donut',
      image: donut8,
      price: 2,
    })
  }

  console.log("DONUTS", donuts)
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [coordinates, setCoordinates] = useState({ lat: 40.26366144, lng: -79.56296556 });
  const [orders, setOrders] = useState([{ 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, address: '5000 Forbes Ave, Pittsburgh, PA 15213' }]);
  const [orderID, setOrderID] = useState(0);
  const [pastAddress, setPastAddress] = useState('5000 Forbes Ave, Pittsburgh, PA 15213');
  // const [total, setTotal] = useState(18);

  const updateAddress = (e) => setAddress(e);
  const updateCoordinates = (e) => setCoordinates(e);
  const updateOrders = () => {
    console.log("updating orders")
    var newOrders = [];
    orders.forEach(o => newOrders.push(o));
    newOrders.push({ 0: cart[0], 1: cart[1], 2: cart[2], 3: cart[3], 4: cart[4], 5: cart[5], 6: cart[6], 7: cart[7], 8: cart[8], address: address })
    setOrders(newOrders);
  }
  const updateOrderID = (e) => {
    console.log("updating order id " + e)
    if (e && e < orders.length) {
      setOrderID(e);
    }
  }
  const updatePastAddress = (e) => setPastAddress(e);

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
  const clearcart = () => {
    setCart([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  useEffect(() => {
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
      subtotal += cart[i] * donuts[i].price;
    }
    setTotal(subtotal);
    // this.setTest(subtotal);
    // console.log(test+"TEST");
  }, [cart])

  useEffect(() => {
    updatePastAddress(orders[orderID]['address']);
  }, [orderID])

  useEffect(() => {
    setOrderID(orders.length - 1);
    clearcart();
    if (orders.length > 1) {
      updatePastAddress(address);
    }
  }, [orders])

  useEffect(() => {
    Geocode.fromAddress(pastAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        updateCoordinates({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [pastAddress])

  console.log('Address: ' + address);
  console.log('Past Address: ' + pastAddress);
  console.log('Coordinates: ' + coordinates);
  console.log('Cart: ' + cart);
  console.log('Orders: ' + orders);
  console.log('Total: ' + total);

  return (
    <DronutContextProvider value={{ address, clearcart, donuts, updateAddress, updateOrders, pastAddress, cart, increment, decrement, orderID, orders, coordinates, total, updateCoordinates, updateOrderID }}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/process/:id' render={(props) => <Processing {...props} />} />
            <Route path="/menu/">
              <Menu />
            </Route>
            <Route path="/edit/">
              <Edit />
            </Route>
            <Route path="/order">
              <Order />
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
