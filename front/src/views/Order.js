import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, 
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';

import MenuItem from './MenuItem';
import { DronutContext } from '../contexts/DronutContext';
import logo from '../logo.png';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
}));

export default function Order() {

  const classes = useStyles();
  const {donuts, orderID, orders, updateOrderID} = useContext(DronutContext);

  var q0 = orders[0][0];
  var q1 = orders[0][1];
  var q2 = orders[0][2];
  if (orderID < orders.length) {
    q0 = orders[orderID][0]
    q1 = orders[orderID][1]
    q2 = orders[orderID][2]
  }

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img className="AppBar-logo" src={logo} alt='logo'/>
          <SearchBar className={classes.title} placeholder="Order ID" value={orderID} onChange={(e)=>updateOrderID(e)}>
          </SearchBar>
          <Button className={classes.button} color="secondary" component={ Link } to='/'>Home</Button>
          <Button className={classes.button} color="secondary" component={ Link } to='/menu'>Menu</Button>
          <Button className={classes.button} color="secondary" component={ Link } to='/order'>Order</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <MenuItem donut={donuts[0]} quantity={q0} />
        <MenuItem donut={donuts[1]} quantity={q1} />
        <MenuItem donut={donuts[2]} quantity={q2} />
      </Grid>
    </div>
  );
}