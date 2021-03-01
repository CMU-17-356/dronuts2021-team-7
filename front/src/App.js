import logo from './logo.png';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="address" label="Enter your address to get started" />
        </form>
        <Button variant="outlined" className={classes.button} color="secondary">
          Start ordering
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Already ordered?
        </a>
      </header>
    </div>
  );
}

export default App;
