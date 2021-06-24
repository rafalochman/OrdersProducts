import './App.css';
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import React, { useState} from 'react';
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

function ProductAdd({ match }) {
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

  const addData = async () => {
    fetch(`http://localhost:8080/api/product`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: nameInput, description: descriptionInput, price: priceInput, orderId: match.params.id})
    });
    await timeout();
    history.goBack();
  };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Add Product</b></p>

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
          <p><Button variant="contained" color="primary" onClick={addData}>Add</Button></p>
        </form>

        <Link className="buttonLink" to={`/orderproducts/${match.params.id}`}>
          <p><Button variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default ProductAdd;