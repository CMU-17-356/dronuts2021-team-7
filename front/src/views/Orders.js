import AxiosCurlirize from 'axios-curlirize';
import Async from 'react-async';
export default function Orders() {

  const context = {
    orders: [
      {
        orderID: 0,
      }
    ]
  }
  const axios = require('axios').default;
  const instance = axios.create({
    baseURL: 'http://credit.17-356.isri.cmu.edu/api'});

AxiosCurlirize(instance);
let tid = ""
let pl = {companyId : "team_7", 
amount: 9}
  instance.post('transactions', pl).then(function(response){
    console.log(response.data);
    tid = response.data.id
    console.log(tid)
  },(error) => {console.log(error.response);})
console.log(tid)
  const orders = context.orders.map(order => <li>Order #{order.orderID}</li>)
  return (
    <div>
      <ul>
        {orders}
      </ul>

    </div>
  );
}