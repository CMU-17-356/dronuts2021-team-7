import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';

import { DronutContext } from '../contexts/DronutContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
    minHeight: 180
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    alignItems: 'right',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MenuItem(props) {
  
  const classes = useStyles();

  const { cart, increment, decrement } = useContext(DronutContext);

  return (
    <Grid item xs={4}>
          <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.donut.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${props.donut.price} / unit
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {props.quantity == null && <IconButton aria-label="previous" color="secondary" variant="contained" onClick={()=>{decrement(props.donut.id)}}>-</IconButton>}
          {props.quantity ? props.quantity : cart[props.donut.id]}
          {props.quantity == null && <IconButton aria-label="previous" color="secondary" variant="contained" onClick={()=>{increment(props.donut.id)}}>+</IconButton>}
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.donut.image}
        title="Live from space album cover"
      />
    </Card>
    </Grid>
  );
}
