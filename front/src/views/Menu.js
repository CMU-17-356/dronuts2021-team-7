import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid, Paper} from '@material-ui/core';
import { Link } from "react-router-dom";

import MenuItem from './MenuItem';
import donut0 from '../donut0.jpg';
import donut1 from '../donut1.jpg';
import donut2 from '../donut2.jpg';
import logo from '../logo.png';
import { DronutContext } from '../contexts/DronutContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Menu() {

  const { address } = useContext(DronutContext);

  const donuts = [
    {
      id: 0,
      title: 'Apple-Crumb Donut',
      image: donut0,
      price: 2,
    },
    {
      id: 1,
      title: 'Bavarian Kreme-Filled Donut',
      image: donut1,
      price: 2,
    },
    {
      id: 2,
      title: 'Blueberry Donut',
      image: donut2,
      price: 2,
    },
  ]

  const menu = donuts.map(donut => <li><MenuItem donut={donut}/></li>);

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  return (
  <div className={classes.root}>
    <AppBar position="static" color="transparent">
      <Toolbar>
        <img className="AppBar-logo" src={logo} alt='logo'/>
        <Typography className={classes.title}>
        </Typography>
        <Button className={classes.button} color="secondary" component={ Link } to='/'>Home</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/menu'>Menu</Button>
        <Button className={classes.button} color="secondary" component={ Link } to='/orders'>Orders</Button>
      </Toolbar>
    </AppBar>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={spacing}>
          {donuts.map(donut => <Grid item><MenuItem donut={donut}/></Grid>)}
        </Grid>
      </Grid>
      </Grid>
  </div>
  );
}