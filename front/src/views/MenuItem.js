import { useContext } from "react";
import { Button } from '@material-ui/core';
import { DronutContext } from '../contexts/DronutContext';

export default function MenuItem(props) {

  const { cart, increment, decrement } = useContext(DronutContext);

  return (
    <div>
      <div>{props.donut.title}</div>
      <div><img src={props.donut.image} alt='donut'/></div>
      <div>Price: ${props.donut.price}</div>
      <div><Button onClick={()=>{decrement(props.donut.id)}}>-</Button></div>
      <div>Quantity: {cart[props.donut.id]}</div>
      <div><Button onClick={()=>{increment(props.donut.id)}}>+</Button></div>
    </div>
  );
}