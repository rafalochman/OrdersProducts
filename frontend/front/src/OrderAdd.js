import './App.css';
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

function timeout() {
  return new Promise( res => setTimeout(res, 300) );
}

function OrderAdd() {
  const history = useHistory();
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

  const addData = async () => {
    fetch(`http://localhost:8080/api/order`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({customerName: customerInput, storeName: storeInput, orderDate: dateInput})
    });
    await timeout();
    history.goBack();
  };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Add Order</b></p>

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
            label="Store name"
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
          <p><Button variant="contained" color="primary" onClick={addData}>Add</Button></p>
        </form>

        <Link className="buttonLink" to="/">
          <p><Button variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default OrderAdd;