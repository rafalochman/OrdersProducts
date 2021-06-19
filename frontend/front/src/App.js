import './App.css';
import Home from "./Home";
import OrderProducts from "./OrderProducts";
import Products from "./Products";
import OrderDetails from "./OrderDetails";
import OrderEdit from "./OrderEdit";
import OrderAdd from "./OrderAdd";
import ProductDetails from "./ProductDetails";
import ProductAdd from "./ProductAdd";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/orderproducts/:id" exact component={OrderProducts}/>
        <Route path = "/products" exact component={Products}/>
        <Route path = "/orderdetails/:id" exact component={OrderDetails}/>
        <Route path = "/orderedit/:id" exact component={OrderEdit}/>
        <Route path = "/orderadd" exact component={OrderAdd}/>
        <Route path = "/productdetails/:id" exact component={ProductDetails}/>
        <Route path = "/productadd/:id" exact component={ProductAdd}/>
      </Switch>
    </Router>
  );
}

export default App;
