import './App.css';
import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';

function OrderDetails({ match }) {
    useEffect(() => {
      fetchData();
    }, []);
  
    const [item, setData] = useState([]);

    const fetchData = async () => {
        const fetchData = await fetch(`http://localhost:8080/api/order?id=${match.params.id}`);
        const items = await fetchData.json();
        setData(items);
      };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Order details</b></p>
        <p>Id: {item.id}</p>
        <p>Customer name: {item.customerName}</p>
        <p>Store name: {item.storeName}</p>
        <p>Order date: {item.orderDate}</p>

        <Link class="buttonLink" to="/">
          <p><Button variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default OrderDetails;