import './App.css';
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "white"
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
        color: 'white',
      },
    }
  },
  input: {
    color: "white"
  }
}));

function OrderEdit({ match }) {
  useEffect(() => {
    fetchData();
  }, []);

  const [item, setData] = useState([]);

  const fetchData = async () => {
    const fetchData = await fetch(`http://localhost:8080/api/order?id=${match.params.id}`);
    const item = await fetchData.json();
    setData(item);
    setCustomer(item.customerName);
    setStore(item.storeName);
    setDate(item.orderDate);
  };

  const classes = useStyles();
  const [customerInput, setCustomer] = useState(" ");
  const [storeInput, setStore] = useState(" ");
  const [dateInput, setDate] = useState(" ");

  const handleCustomerInput = event => {
    setCustomer(event.target.value);
  };
  const handleStoreInput = event => {
    setStore(event.target.value);
  };
  const handleDateInput = event => {
    setDate(event.target.value);
  };

  const editData = async () => {
    fetch(`http://localhost:8080/api/order`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: match.params.id, customerName: customerInput, storeName: storeInput, orderDate: dateInput})
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Edit Order</b></p>

        <form>
          <TextField
          value={customerInput}
          onChange={handleCustomerInput}
            InputProps={{
              className: classes.input
            }}
            className={classes.root}
            variant="outlined"
            label="Customer name"
            >
          </TextField>
            <br></br><br></br>
          <TextField
          value={storeInput}
          onChange={handleStoreInput}
            InputProps={{
              className: classes.input
            }}
            className={classes.root}
            variant="outlined"
            label="Description"
            >
          </TextField>
          <br></br><br></br>
          <TextField
          value={dateInput}
          onChange={handleDateInput}
            InputProps={{
              className: classes.input
            }}
            className={classes.root}
            variant="outlined"
            label="Date"
            >
          </TextField>
          <p><Button variant="contained" color="primary" onClick={editData}>Edit</Button></p>
        </form>

        <Link className="buttonLink" to="/">
          <p><Button variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default OrderEdit;