// import AxiosCurlirize from 'axios-curlirize';
import { useEffect, useState } from 'react';
// import Async from 'react-async';

const axios = require('axios').default;

function Status(props) {


  const [status,setStatus] = useState({});

  async function getStatus() {
    try {
      const response = await axios.get('http://drones.17-356.isri.cmu.edu/api/drones/41/');
      // handle success
      // console.log(response.data)
      setStatus(response.data)
    } catch (error) {
      // handle error
      console.log(error);
    }
  }


  useEffect(() => {
    getStatus()

    // console.log(status)
  }
  )

  // console.log(status)
  
  return (<div>
    <h1>Payment Successful, Sending out Drone 41</h1>
    <hr></hr>
    Name: {status.drone_name}<br/>
    {status.current_delivery 
    ?<div> <p>Status: {status.current_delivery.status}</p>
     <p>Time Start: {status.current_delivery.route.time_start}</p>
     <p>Time Return: {status.current_delivery.route.time_return}</p></div>
    : <p>Status: Loading...</p> }
    {status.battery 
    ? <p>Battery: {status.battery.charge*100/status.battery.capacity}%</p> 
    : <p>Battery: Loading...</p>}
    
  </div>
  
  );
}


export default Status