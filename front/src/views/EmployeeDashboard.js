import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';

const axios = require('axios').default;

export default function EmployeeDashboard() {
  const [orders, setOrders] = React.useState([]);
  const columns = [
    { field: 'id', headerName: 'Order ID', width:150 },
    { field: 'date', headerName: 'Date', width: 250},
    { field: 'firstName', headerName: ' First Name', width:150 },
    { field: 'lastName', headerName: 'Last Name', width:150 },
    { field: 'addressId', headerName: 'Address', width:150 }
  ];

  async function getOrders() {
    try {
      const response = await axios.get('http://localhost:3000/orders');
      let tmp = response.data;
      tmp.map(async function (order) {
        const res = await axios.get('http://localhost:3000/customers/' + order['customerId']);
        Object.keys(res.data).forEach(function(key) {
          if (key !== 'id') {
            order[key] = res.data[key];
          }
        });
        order['date'] = (new Date(order['date'])).toString();
      });
      setOrders(tmp);
      console.log(tmp);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <div style ={{ height: 400, width: '100%' }}>
      <DataGrid rows={orders} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
