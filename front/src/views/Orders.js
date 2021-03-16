export default function Orders() {

  const context = {
    orders: [
      {
        orderID: 0,
      }
    ]
  }

  const orders = context.orders.map(order => <li>Order #{order.orderID}</li>)
  return (
    <div>
      <ul>
        {orders}
      </ul>
    </div>
  );
}