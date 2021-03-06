import {
  AppBar,
  Button,
  Grid,

  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { DronutContext } from '../contexts/DronutContext';
import logo from '../logo.png';
import MenuItem from './MenuItem';


//initializing api with url and header -Ay
const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://credit.17-356.isri.cmu.edu/api',
headers: {'Accept':'application/json'}});
// AxiosCurlirize(instance);



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
  // const { total } = useContext(DronutContext);

  const classes = useStyles();
  const {address, coordinates, donuts, updateOrders, total} = useContext(DronutContext);
  const [redirect, setRedirect] = useState(false);
  let response_data_id = 0;

  //State to get and store transaction id
  // const [items,setItems] = React.useState([]);
  console.log(total+"BFBFB")
  //getting transaction ID.
  async function getTransactionId() {
    try {
      const response = await instance.post('transactions',{companyId: 'team_7', amount: total});
      // handle success
      console.log(total+"BFBFB")
      window.open("http://credit.17-356.isri.cmu.edu/?transaction_id="+response.data.id, '_blank');
      response_data_id = response.data.id;
      window.location.href='/process/'+response.data.id;
      /*this.props.history.push('/process/'+response.data.id);*/
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  function renderRedirect() {
    if (redirect) {
      console.log("Redirect!");
      return <Redirect to={"/process/" + response_data_id} />;
    }
  }

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
        <Button className={classes.button} color="secondary" component={ Link } to='/employee'>Employees</Button>
      </Toolbar>
    </AppBar>

    <Grid container spacing={1}>
      {donuts.map(donut => <MenuItem donut={donut}/>)}
    </Grid>
    {total > 0 ?
    <Button variant="contained" className={classes.root} color="secondary" onClick={() => {getTransactionId()}}>Pay</Button> :
    <Button disabled variant="contained" className={classes.root} color="secondary" component={ Link } to='/order' onClick={() => updateOrders()}>Pay</Button>}
  </div>
  )
}
