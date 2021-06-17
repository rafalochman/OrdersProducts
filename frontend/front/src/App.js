import './App.css';
import Home from "./Home";
import OrderProducts from "./OrderProducts";
import Products from "./Products";
import EditOrder from "./Home";
import EditPosition from "./Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/orderproducts/:id" exact component={OrderProducts}/>
        <Route path = "/products" exact component={Products}/>
        <Route path = "/editOrder/:id" exact component={EditOrder}/>
        <Route path = "/editposition/:id" exact component={EditPosition}/>
      </Switch>
    </Router>
  );
}

export default App;
