import './App.css';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';


function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const [items, setData] = useState([]);

  const fetchData = async () => {
    const fetchData = await fetch(`http://localhost:8080/api/order/all`);
    const items = await fetchData.json();
    setData(items);
  };

  const deleteData = (id) => async () => {
    await fetch(`http://localhost:8080/api/order?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="App">
      <div className="App-header">

        <p>Orders - Positions App</p>
        <p><b>Orders</b></p>

        <Table className="ordersTable" aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Customer name</TableCell>
              <TableCell>Store name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell width="400px">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.storeName}</TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell>
                    <Link to={`/orderproducts/${row.id}`} className="buttonLink">
                        <Button color="primary" variant="contained">Products</Button>
                    </Link>
                    <Link to={`/orderdetails/${row.id}`} className="buttonLink detailsButton">
                        <Button color="secondary" variant="contained">Details</Button>
                    </Link>
                    <Link to={`/orderedit/${row.id}`} className="buttonLink editButton">
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
            <Link className="buttonLink" to="/orderadd">
                <Button variant="contained" color="primary" >Add Order</Button>
            </Link>
        </p>
        <p>
            <Link className="buttonLink" to="/products">
                <Button variant="contained" color="primary" >All purchased products</Button>
            </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;