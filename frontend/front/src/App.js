import './App.css';
import Home from "./Home";
import Orders from "./Orders";
import Positions from "./Home";
import AddOrder from "./Home";
import AddPosition from "./Home";
import EditOrder from "./Home";
import EditPosition from "./Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/orders" exact component={Orders}/>
        <Route path = "/positions" exact component={Positions}/>
        <Route path = "/addorder" exact component={AddOrder}/>
        <Route path = "/addposition" exact component={AddPosition}/>
        <Route path = "/editOrder/:id" exact component={EditOrder}/>
        <Route path = "/editposition/:id" exact component={EditPosition}/>
      </Switch>
    </Router>
  );
}

export default App;
