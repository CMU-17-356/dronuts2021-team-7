import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Grid, Paper} from '@material-ui/core';

import { Link } from "react-router-dom";

import MenuItem from './MenuItem';

import donut0 from '../donut0.jpg'
import donut2 from '../donut2.jpg'
import logo from '../logo.png';
import { DronutContext } from '../contexts/DronutContext';
    id: 2,
    name: 'Powered Sugar Donut',
    image: donut2,
    price: 2,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

    <div></div>
    <div></div>
    {donuts.map(donut => <MenuItem donut={donut}/>)}
  </div>
  );
}
