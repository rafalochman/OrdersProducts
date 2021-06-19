import './App.css';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';


function OrderProducts({ match }) {
  useEffect(() => {
    fetchData();
  }, []);

  const [items, setData] = useState([]);
  
  const fetchData = async () => {
    const fetchData = await fetch(`http://localhost:8080/api/product/order?id=${match.params.id}`);
    const items = await fetchData.json();
    setData(items);
  };

  const deleteData = (id) => async () => {
    await fetch(`http://localhost:8080/api/product?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="App">
      <div className="App-header">
        <p><b>Order products</b></p>

        <Table className="ordersTable" aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell width="280px">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price} $</TableCell>
                <TableCell>
                    <Link to={`/productdetails/${row.id}`} className="buttonLink">
                        <Button color="secondary" variant="contained">Details</Button>
                    </Link>
                    <Link to={`/productedit/${row.id}`} className="buttonLink editButton">
                        <Button color="secondary" variant="contained">Edit</Button>
                    </Link>
                    <Link to="#" className="buttonLink deleteButton">
                        <Button onClick={deleteData(row.id)} color="secondary" variant="contained">Delete</Button>
                    </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p>
            <Link className="buttonLink" to={`/productadd/${match.params.id}`}>
                <Button variant="contained" color="primary" >Add Product</Button>
            </Link>
        </p>

        <Link className="buttonLink" to="/">
          <p><Button variant="contained">Back</Button></p>
        </Link>
      </div>
    </div>
  );
}

export default OrderProducts;