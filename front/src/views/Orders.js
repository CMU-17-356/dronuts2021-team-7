import AxiosCurlirize from 'axios-curlirize';
import { Component } from 'react';
import Async from 'react-async';

const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://credit.17-356.isri.cmu.edu/api',
headers: {'Accept':'application/json'}});
AxiosCurlirize(instance);
let pl = {companyId : "team_7", 
amount: 9}




class Orders extends Component{

  constructor(){
    super();
    this.state = {
      isLoaded: false,
      items: [],
      error: null
    };
  }

  // componentDidMount(){
  //   this.getData();
  //  }

   componentDidMount() {
    instance.post('transactions',pl)
      .then(res => res.data)
      .then(
        (result) => {
          console.log(result.id)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.id}
        </ul>
      );
    }
  }
}

export default Orders