import './App.css';
import Button from "@material-ui/core/Button"
import {Link} from 'react-router-dom';

function Home(){
  return (
    <div className="App">
      <div className="App-header">
        <Link className="buttonLink" to="/orders">
          <Button variant="contained" color="primary" >Orders</Button>
        </Link>
        <Link className="buttonLink" to="/positions">
          <Button variant="contained" color="primary" >Positions</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;