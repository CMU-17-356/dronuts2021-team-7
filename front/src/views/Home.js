import { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    TextField
} from '@material-ui/core';
import logo from '../logo.png';
import { DronutContext } from '../contexts/DronutContext';

export default function Home() {

    const {address, updateAddress} = useContext(DronutContext);
    return (
        <div>
            <div><img src={logo} alt='logo'/></div>
            <div><TextField label='Enter your address to get started' value={address} onChange={e => updateAddress(e)}></TextField></div>
            <div><Button component={ Link } to='/menu'>Start ordering</Button></div>
            <div><Link to="/orders">Already ordered?</Link></div>
        </div>
    )
  }
