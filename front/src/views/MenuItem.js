import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';

import { DronutContext } from '../contexts/DronutContext';

// import donut0 from '../donut0.jpg'
// import donut1 from '../donut1.jpg'
// import donut2 from '../donut2.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 420,
    margin: theme.spacing(1)
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
  const theme = useTheme();

  const { cart, increment, decrement } = useContext(DronutContext);

  return (
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
          <IconButton aria-label="previous" onClick={()=>{decrement(props.donut.id)}}>
            -
          </IconButton>
          {cart[props.donut.id]}
          <IconButton aria-label="next" onClick={()=>{increment(props.donut.id)}}>
            +
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.donut.image}
        title="Live from space album cover"
      />
    </Card>
  );
}
