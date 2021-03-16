import React, { useEffect,useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import {Grid, Paper} from '@material-ui/core';
import { DronutContext } from '../contexts/DronutContext'
import { Link } from "react-router-dom";

import MenuItem from './MenuItem';

import donut0 from '../donut0.jpg'
import donut1 from '../donut1.jpg'
import donut2 from '../donut2.jpg'
import logo from '../logo.png';
import AxiosCurlirize from 'axios-curlirize';
import App from '../App'

//initializing api with url and header -Ay
const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://credit.17-356.isri.cmu.edu/api',
headers: {'Accept':'application/json'}});
// AxiosCurlirize(instance);



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

export default function Menu(props) {
  const { total } = useContext(DronutContext);
   
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  //State to get and store transaction id
  // const [items,setItems] = React.useState([]);
  console.log(total+"BFBFB")
  //getting transaction ID. 
  async function getTransactionId() {
    try {
      const response = await instance.post('transactions',{companyId: 'team_7', amount: total});
      // handle success
      // console.log("BROOO"+response.data.id)
      // setItems(response.data)
      window.open("http://credit.17-356.isri.cmu.edu/?transaction_id="+response.data.id, '_blank');
      window.location.href='/process/'+response.data.id;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

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
    <Button onClick={async () => {
      try {getTransactionId();} 
      catch (error) {console.log(error)}
      }} variant="contained" className={classes.root} color="secondary" component={ Link } to='/orders'>Pay ${total}</Button>
  </div>
  );
}
