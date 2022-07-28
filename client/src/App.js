import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./pages/Home"
import CreateOperation from "./pages/CreateOperation"
import Operation from "./pages/Operation"
import Operations from "./pages/Operations"

function App() {
  
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <ul>
            <li> <Link to="/"> Inicio </Link> </li>
            <li> <Link to="/operations"> Operaciones </Link> </li>
          </ul>
        </div>
        <div className='routes'>
            <Routes>
              <Route path="/" exact element={ <Home /> } />
              <Route path="/createoperation" exact element={ <CreateOperation /> } />
              <Route path="/operation/:id" exact element={ <Operation /> } />
              <Route path="/operations" exact element={ <Operations /> } />
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
