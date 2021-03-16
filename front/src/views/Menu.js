import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

import MenuItem from './MenuItem';
import donutimage from '../donut.jpg';
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
}));

export default function Menu() {

  const { address } = useContext(DronutContext);

  const donuts = [
    {
      id: 0,
      title: 'The Donut',
      image: donutimage,
      price: 2,
    }
  ]

  const menu = donuts.map(donut => <li><MenuItem donut={donut}/></li>);

  const classes = useStyles();

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
    <div>
        <ul>
          {menu}
        </ul>
      </div>
  </div>
  );
}