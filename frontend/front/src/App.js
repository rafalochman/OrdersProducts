import './App.css';
import Home from "./Home";
import OrderPositions from "./OrderPositions";
import AddPosition from "./Home";
import EditOrder from "./Home";
import EditPosition from "./Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/orderdetails/:id" exact component={OrderPositions}/>
        <Route path = "/addposition" exact component={AddPosition}/>
        <Route path = "/editOrder/:id" exact component={EditOrder}/>
        <Route path = "/editposition/:id" exact component={EditPosition}/>
      </Switch>
    </Router>
  );
}

export default App;
