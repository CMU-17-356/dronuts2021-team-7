import { TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';
import logo from '../logo.png';

const axios = require('axios').default;

export default function EmployeeDashboard() {
  const [orders, setOrders] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const columns = [
    { field: 'id', headerName: 'Order ID', width:150 },
    { field: 'date', headerName: 'Date', width: 250},
    { field: 'firstName', headerName: ' First Name', width:150 },
    { field: 'lastName', headerName: 'Last Name', width:150 },
    { field: 'address', headerName: 'Address', width:400 }
  ];

  async function getOrderDetails(id) {
    try {
      const response = await axios.get('http://dronuts7.azurewebsites.net/orders/' + id.target.value + '/order-items');
      console.log(response.data);
      setOrderDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrders() {
    try {
      const response = await axios.get('http://dronuts7.azurewebsites.net/orders');
      let tmp = response.data;
      tmp.map(async function (order) {
        const res = await axios.get('http://dronuts7.azurewebsites.net/customers/' + order['customerId']);
        const addrRes = await axios.get('http://dronuts7.azurewebsites.net/addresses/' + order['addressId'])
        Object.keys(res.data).forEach(function(key) {
          if (key !== 'id') {
            order[key] = res.data[key];
          }
        });
        order['date'] = (new Date(order['date'])).toString();
        let addr = addrRes.data.line1 + ", ";
        if (addrRes.data.line2) {
          addr = addr + addrRes.data.line2 + ", ";
        }
        addr = addr + addrRes.data.city + " " + addrRes.data.state + " " + addrRes.data.zipCode;
        console.log(addr);
        order['address'] = addr;
      });
      setOrders(tmp);
      console.log(tmp);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateOrder(param) {
    try {
      const res = await axios.delete('http://dronuts7.azurewebsites.net/orders/' + param.data.id);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <div style ={{ height: 400, width: '100%' }}>
      <div ><img className="App-logo" src={logo} class="center" style={{width:"20%",height:"20%"}} alt='logo'/></div>
      <h3>Pending orders</h3>
      <DataGrid rows={orders} columns={columns} pageSize={5} onRowSelected={updateOrder} checkboxSelection />
      <TextField onChange={e => getOrderDetails(e)}/>
      Order details: {JSON.stringify(orderDetails)}
    </div>
  );
}
