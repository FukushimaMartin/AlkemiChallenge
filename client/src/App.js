import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./pages/Home"
import CreateOperation from "./pages/CreateOperation"
import Operation from "./pages/Operation"

function App() {
  

  return (
    <div className="App">
     <Router>
      <div className="navbar">
        <ul>
          <li> <Link to="/createoperation"> New Operation </Link> </li>
          <li> <Link to="/"> Home Page </Link> </li>
        </ul>
      </div>
      <div className='routes'>
        <div className='routers'>
          <Routes>
            <Route path="/" exact element={ <Home /> } />
            <Route path="/createoperation" exact element={ <CreateOperation /> } />
            <Route path="/operation/:id" exact element={ <Operation /> } />
          </Routes>
        </div>
      </div>
     </Router>
    </div>
  );
}

export default App;
