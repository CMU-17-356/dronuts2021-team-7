import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png';
import { DronutContext } from '../contexts/DronutContext';
import '../App.css';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    button: {
      margin: theme.spacing(1),
      borderRadius: "5em",
    },
  }));


export default function Home() {

    const classes = useStyles();

    const [value, setValue] = useState(null);

    const {address, updateAddress, updateCoordinates} = useContext(DronutContext);
    return (
        <div>
            <header className="App-header">
                <div><img className="App-logo" src={logo} alt='logo'/></div>
                {/* <div><TextField className={classes.root} label='Enter your address to get started' value={address} onChange={e => updateAddress(e)}></TextField></div> */}
                <Search updateAddress={updateAddress} updateCoordinates={updateCoordinates} />
                <div><Button variant="outlined" className={classes.button} color="secondary" component={ Link } to='/menu'>Start ordering</Button></div>
                <div><Link className="App-link" to="/order">Already ordered?</Link></div>
                
            </header>
        </div>
    )
  }