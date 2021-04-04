import React, { useState } from 'react';
const axios = require('axios').default;

export default function Edit(props) {
  // AxiosCurlirize(axios);
  const [md, setMd] = useState(0);
  const [of, setOf] = useState(0);

  function handleSubmit() {
    console.log("MD", md);
    console.log("OF", of);
    axios.put("http://dronuts7.azurewebsites.net/items/1/",
      {
        "id": 1,
        "name": "Marble-Frosted Donut",
        "description": "donut inserted",
        "price": md,
        "qtyAvailable": 100
      })
    axios.put("http://dronuts7.azurewebsites.net/items/2/",
      {
        "id": 2,
        "name": "Old-Fashioned Donut",
        "description": "donut inserted",
        "price": of,
        "qtyAvailable": 13
      })
  }

  return (
    <>
      <h2>Enter prices for Donuts</h2>
      <form onSubmit={() => { handleSubmit() }}>
        <label>Marble Donut Price:
      <input type="number" value={md} onChange={e => setMd(e.target.value)} />
        </label><br />
        <label>Old Fashioned Donut Price:
        <input type="number" value={of} onChange={f => setOf(f.target.value)} />
        </label>
        <input type="submit" value="Submit" /></form></>
  )
}
