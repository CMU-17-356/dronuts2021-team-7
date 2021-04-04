import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://dronuts7.azurewebsites.net/'
});

export async function createOrders(orders) {
  console.log(orders[0]);
  const order = (await backend.post('orders', {addressId: 1, customerId: 1})).data;
  console.log("The order is " + JSON.stringify(order));
  let responses = [];
  let orderItems = [];
  // Create order items
  for (let i = 0; i < 9; i++) {
    if (orders[0][i] > 0) {
      try {
        const response = await backend.post('orders/' + order.id + '/order-items', {itemId: (i+1), quantity: orders[0][i]});
        responses.push(response);
        orderItems.push({id: response.data.id, itemId: (i + 1), quantity: orders[0][i]});
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log("The created order item IDs are " + JSON.stringify(responses.map(e => e.data.id)));

}
