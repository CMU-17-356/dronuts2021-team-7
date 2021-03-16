import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

import MenuItem from './MenuItem';

import donut0 from '../donut0.jpg'
import donut1 from '../donut1.jpg'
import donut2 from '../donut2.jpg'
import logo from '../logo.png';

import { DronutContext } from '../contexts/DronutContext';

const donuts = [
  {
    id: 0,
    name: 'Marble-Frosted Donut',
    image: donut0,
    price: 2,
  },
  {
    id: 1,
    name: 'Old- Fashioned Donut',
    image: donut1,
    price: 2,
  },
  {
    id: 2,
    name: 'Powered Sugar Donut',
    image: donut2,
    price: 2,
  },
]

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
  const {address, coordinates} = useContext(DronutContext);

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
        <Button className={classes.button} color="secondary" component={ Link } to='/orders'>Orders</Button>
      </Toolbar>
    </AppBar>

    <div></div>
    <div></div>
    {donuts.map(donut => <MenuItem donut={donut}/>)}
    <Button variant="contained" className={classes.root} color="secondary" component={ Link } to='/orders'>Pay</Button>
  </div>
  );
}
