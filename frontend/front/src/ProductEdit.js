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

function ProductEdit({ match }) {
    useEffect(() => {
      fetchData();
    }, []);
  
    const [item, setData] = useState([]);
  
    const fetchData = async () => {
      const fetchData = await fetch(`http://localhost:8080/api/product?id=${match.params.id}`);
      const item = await fetchData.json();
      setData(item);
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
    };

  const history = useHistory();
  const classes = useStyles();
  const [nameInput, setName] = useState(" ");
  const [descriptionInput, setDescription] = useState(" ");
  const [priceInput, setPrice] = useState(" ");

  const handleNameInput = event => {
    setName(event.target.value);
  };
  const handleDescriptionInput = event => {
    setDescription(event.target.value);
  };
  const handlePriceInput = event => {
    setPrice(event.target.value);
  };

  const editData = async () => {
    fetch(`http://localhost:8080/api/product`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: match.params.id, name: nameInput, description: descriptionInput, price: priceInput, orderId: item.orderId})
    });
    await timeout();
    history.goBack();
  };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Edit Product</b></p>

        <form>
          <TextField
          value={nameInput}
          onChange={handleNameInput}
            InputProps={{
              className: classes.input
            }}
            className={classes.root}
            variant="outlined"
            label="Name"
            >
          </TextField>
            <br></br><br></br>
          <TextField
          value={descriptionInput}
          onChange={handleDescriptionInput}
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
          value={priceInput}
          onChange={handlePriceInput}
            InputProps={{
              className: classes.input
            }}
            className={classes.root}
            variant="outlined"
            label="Price"
            >
          </TextField>
          <p><Button variant="contained" color="primary" onClick={editData}>Save</Button></p>
        </form>

        <Link className="buttonLink" to="#">
          <p><Button onClick={history.goBack} variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default ProductEdit;