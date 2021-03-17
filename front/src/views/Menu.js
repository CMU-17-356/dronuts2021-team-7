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
  }
}))

export default function Menu() {

  const classes = useStyles();
  const {address, coordinates, donuts, updateOrders, total} = useContext(DronutContext);

  return (
    <div className={classes.root}>
    <AppBar position="static" color="transparent">
      <Toolbar>
        <img className="AppBar-logo" src={logo} alt='logo'/>
        <Typography className={classes.title}>
          Delivery to: {address}
        </Typography>
        <Button className={classes.button} color="secondary" component={ Link } to='/'>Home</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/menu'>Menu</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/order'>Order</Button>
      </Toolbar>
    </AppBar>

    <Grid container spacing={1}>
      {donuts.map(donut => <MenuItem donut={donut}/>)}
    </Grid>
    {total > 0 
    ? <Button variant="contained" className={classes.root} color="secondary" component={ Link } to='/order' onClick={() => updateOrders()}>Pay</Button> 
    : <Button disabled variant="contained" className={classes.root} color="secondary" component={ Link } to='/order' onClick={() => updateOrders()}>Pay</Button>}
  </div>
  );
}
