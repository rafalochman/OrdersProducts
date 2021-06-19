import './App.css';
import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function ProductDetails({ match }) {
    useEffect(() => {
      fetchData();
    }, []);
  
    const history = useHistory();
    const [item, setData] = useState([]);

    const fetchData = async () => {
        const fetchData = await fetch(`http://localhost:8080/api/product?id=${match.params.id}`);
        const items = await fetchData.json();
        setData(items);
      };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Product details</b></p>
        <p>Id: {item.id}</p>
        <p>Name: {item.name}</p>
        <p>Description: {item.description}</p>
        <p>Price: {item.price} $</p>
        <p>Order Id: {item.orderId}</p>

        <Link className="buttonLink" to="#">
          <p><Button onClick={history.goBack} variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;