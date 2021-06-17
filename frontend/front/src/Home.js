import './App.css';
import Button from "@material-ui/core/Button"
import {Link} from 'react-router-dom';

function Home(){
  return (
    <div className="App">
      <div className="App-header">
        <Link class="buttonLink addButton" to="/orders">
          <Button variant="contained" color="primary" >Orders</Button>
        </Link>
        <Link class="buttonLink addButton" to="/positions">
          <Button variant="contained" color="primary" >Positions</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;