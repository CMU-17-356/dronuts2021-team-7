import { Button } from '@material-ui/core';
export default function Cart() {

  const context = {
    cartitems: [{
      quantity: 2,
      title: 'The Donut',
      price: 2
    }]
  }

  const cartitems = context.cartitems.map(ca => <li>{ca.quantity} x {ca.title} @ ${ca.price} / unit</li>);
  const subtotal = context.cartitems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0);

  return (
    <div>
      <ul>
        {cartitems}
      </ul>
      <div>Subtotal: $ {subtotal}</div>
      <div><Button>Pay</Button></div>
    </div>
  );
}