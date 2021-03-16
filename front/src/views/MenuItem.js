import React, { useContext } from "react";
import { Button, Grid } from '@material-ui/core';
import { DronutContext } from '../contexts/DronutContext';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import './../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
}));

export default function MenuItem(props) {

  const { cart, increment, decrement } = useContext(DronutContext);
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  return (
    <div>
      <div>{props.donut.title}</div>
      <Paper className={classes.paper}>
        <img width="300" src={props.donut.image} alt='donut'/>
        <div>
          ${props.donut.price} / unit
          <Button variant="contained" color="secondary" onClick={()=>{decrement(props.donut.id)}}>-</Button>
          {cart[props.donut.id]}
          <Button variant="contained" color="secondary" onClick={()=>{increment(props.donut.id)}}>+</Button>
        </div>
      </Paper>
    </div>
  );
}