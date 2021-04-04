import { AppBar, Button, TableContainer, TableRow, TextField, Toolbar, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.png';

const axios = require('axios').default;

const base_url = "http://dronuts7.azurewebsites.net/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}))

export default function EmployeeDashboard() {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const columns = [
    { field: 'id', headerName: 'Order ID', width:150 },
    { field: 'date', headerName: 'Date', width: 250},
    { field: 'firstName', headerName: ' First Name', width:150 },
    { field: 'lastName', headerName: 'Last Name', width:150 },
    { field: 'address', headerName: 'Address', width:400 }
  ];

  async function getItems() {
    try {
      const response = await axios.get(base_url + 'items');
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrderDetails(id) {
    try {
      const response = await axios.get(base_url + 'orders/' + id.target.value + '/order-items');
      console.log(response.data);
      setOrderDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrders() {
    try {
      const response = await axios.get(base_url + 'orders');
      let tmp = response.data;
      tmp.map(async function (order) {
        const res = await axios.get(base_url + 'customers/' + order['customerId']);
        const addrRes = await axios.get(base_url + 'addresses/' + order['addressId']);
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
      const res = await axios.delete(base_url + 'orders/' + param.data.id);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getOrders();
    getItems();
  }, []);

  let myItem = function (itemId) {
    return items.filter(e => e.id == itemId)[0];
  }

  return (
    <div style ={{ height: 400, width: '100%' }} className={classes.root}>
      <AppBar position="static" color="transparent">
      <Toolbar>
        <img className="AppBar-logo" src={logo} alt='logo'/>
        <Typography className={classes.title}>
          Employee Dashboard
        </Typography>
        <Button className={classes.button} color="secondary" component={ Link } to='/'>Home</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/menu'>Menu</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/order'>Order</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/employee'>Employees</Button>
      </Toolbar>
    </AppBar>

      <h3>Pending orders</h3>
      <DataGrid rows={orders} columns={columns} pageSize={5} onRowSelected={updateOrder} checkboxSelection />
      Enter order ID: <TextField onChange={e => getOrderDetails(e)}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="order items table">
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((orderItem) => (
              <TableRow>
                <TableCell>{myItem(orderItem.itemId).name}</TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
