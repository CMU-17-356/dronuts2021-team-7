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
  var q3 = orders[0][3];
  var q4 = orders[0][4];
  var q5 = orders[0][5];
  var q6 = orders[0][6];
  var q7 = orders[0][7];
  var q8 = orders[0][8];
  if (orderID < orders.length) {
    q0 = orders[orderID][0];
    q1 = orders[orderID][1];
    q2 = orders[orderID][2];
    q3 = orders[orderID][3];
    q4 = orders[orderID][4];
    q5 = orders[orderID][5];
    q6 = orders[orderID][6];
    q7 = orders[orderID][7];
    q8 = orders[orderID][8];
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
        {q0>0 && <MenuItem donut={donuts[0]} quantity={q0} units={true} />}
        {q1>0 && <MenuItem donut={donuts[1]} quantity={q1} units={true} />}
        {q2>0 && <MenuItem donut={donuts[2]} quantity={q2} units={true} />}
        {q3>0 && <MenuItem donut={donuts[3]} quantity={q3} units={true} />}
        {q4>0 && <MenuItem donut={donuts[4]} quantity={q4} units={true} />}
        {q5>0 && <MenuItem donut={donuts[5]} quantity={q5} units={true} />}
        {q6>0 && <MenuItem donut={donuts[6]} quantity={q6} units={true} />}
        {q7>0 && <MenuItem donut={donuts[7]} quantity={q7} units={true} />}
        {q8>0 && <MenuItem donut={donuts[8]} quantity={q8} units={true} />}
      </Grid>
    </div>
  );
}