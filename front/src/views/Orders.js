import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import logo from '../logo.png';


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

export default function Orders() {

  const context = {
    orders: [
      {
        orderID: 0,
      }
    ]
}

  const classes = useStyles();

  const orders = context.orders.map(order => <li>Order #{order.orderID}</li>)
  return (
    <div>
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
      <ul>
        {orders}
      </ul>
    </div>
  );
}
