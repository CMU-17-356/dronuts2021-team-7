import AxiosCurlirize from 'axios-curlirize';
import { useEffect, useState } from 'react';
import Async from 'react-async';

const axios = require('axios').default;

function Processing(props) {


  const [process,setProcess] = useState({});

  async function getStatus() {
    try {
      const response = await axios.get('http://credit.17-356.isri.cmu.edu/api/transactions/' + props.match.params.id);
      // handle success
      setProcess(response.data)
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  useEffect(() => {
    getStatus()


  }
  )

  if(process.status == 'approved'){
    return(
      <div>
        Payment Success! Redirecting
      </div>
    )
  }
  else if(process.status == 'denied'){
    return(
      <div>
        Payment Denied, please try checking out again.
      </div>
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