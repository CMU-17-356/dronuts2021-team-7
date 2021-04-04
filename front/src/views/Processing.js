import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { createOrders } from '../BackendUtil.js';

const axios = require('axios').default;
// AxiosCurlirize(axios);
function Processing(props) {


  const [process,setProcess] = useState({});
  // const [status,setStatus] = useState({});

  async function getStatus() {
    try {
      const response = await axios.get('http://credit.17-356.isri.cmu.edu/api/transactions/' + props.match.params.id);
      // handle success
      if (response.data.status !== 'denied') {
        await createOrders(props.orders);
      }
      setProcess(response.data)
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function sendDrone() {
    try {
      const response = await axios.put('http://drones.17-356.isri.cmu.edu/api/drones/41/send',{lat : 40.44, lon: -79.95});
      // handle success
      // console.log("BROOO"+response.data)
      // setStatus(response.data)
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  useEffect(() => {
    getStatus()
  }
  , []);

  if(process.status === 'denied'){
    return(
      <div>
        Payment Denied, please try checking out again.
      </div>
    )
  } else if(process.status === 'approved') {
    return(console.log("GOING OUT"),sendDrone(),
      <Redirect to={'/order/'}></Redirect>
    )
  }
  else{
  return (
    <div>
      <ul>
        Processing Payment<br/>
        Status={process.status}
      </ul>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );}
}

export default Processing
