import AxiosCurlirize from 'axios-curlirize';
import { Component } from 'react';
import Async from 'react-async';

const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://credit.17-356.isri.cmu.edu/api'});
AxiosCurlirize(instance);
let pl = {companyId : "team_7", 
amount: 9}




class Orders extends Component{

  constructor(){
    super();
    this.state = {
      name: "React"
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount(){
    this.getData();
   }
   
  async getData(){
    let data = await instance
    .post('transactions',pl)
    .then(function(response){
      return response;
    })
    .catch(function(error){
      console.log(error);
    });
    this.setState({transaction: (data.data)})
  }

 

  render() {
    let { transaction} = [];
    transaction = (this.state)
    console.log(this.state.transaction)
    return (
      <div>
        <h3>Using componentDidMount for initial data render</h3>
        <hr />
        {transaction &&
          transaction.map(transaction => {
            return (
              <table>
                <tr>
                  <td>{transaction.id}</td>
                  <td>
                    <p key={transaction.id}>{transaction.title}</p>
                  </td>
                </tr>
              </table>
            );
          })}
      </div>
    );
  }
}

export default Orders