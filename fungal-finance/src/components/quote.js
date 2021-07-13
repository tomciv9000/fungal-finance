import React, { useState, useEffect } from 'react';
import axios from 'axios';
//var axios = require('axios');
var emptyCalories = '';

function Quote() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({ result: [] });
  


  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=CLXPF',
      headers: { 
        'x-rapidapi-key': '917b114e06mshac185f65ba54212p18560bjsne9b926a3c3a6', 
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      },
      data : emptyCalories
    };

    axios(config)
      .then(
        (result) => {
          setData(result.data.quoteResponse.result[0]);
          console.log("Result: ", result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div>
      <h3>{data.symbol} - {data.longName}</h3>
      <p>Market Price: <b>{data.regularMarketPrice}</b></p>
      <p>Market Day Range: <b>{data.regularMarketDayRange}</b></p>
      <p>Market Price: <b>{data.regularMarketPrice}</b></p>
      </div>
    );
  }
}

export default Quote;