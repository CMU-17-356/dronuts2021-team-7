import AxiosCurlirize from 'axios-curlirize';
import { Component } from 'react';

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
      error: null,
      
      paidc: false,
      paid: []
    };
  }

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

  getStatus(id) {
    instance.get('transactions/'+id)
      .then(res => res.data)
      .then(
        (result) => {
          console.log(result.status)
          if(result.status === 'pending'){
            this.setState({
              paid: result,
              paidc: false
            });
          }
          else if(result.status === 'approved') {
          this.setState({
            paid: result,
            paidc: true
          });}
          else if(result.status === 'denied'){
            this.setState({
              paid: result,
              paidc: true
            });}
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items,paidc,paid } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if(!paidc){
      // this.getStatus(items.id)
    console.log(paid)
    }

      return (
        <ul>
          Order ID: 0<hr/>
          <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/process';
      window.open("http://credit.17-356.isri.cmu.edu/?transaction_id="+items.id, '_blank');
      }}
> Pay Now</button>
        </ul>
      );
    }
  }
}

export default Orders