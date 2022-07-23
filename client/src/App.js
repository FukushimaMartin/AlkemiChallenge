import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Operation from "./pages/Operation"

function App() {
  

  return (
    <div className="App">
     <Router>
      <div className="navbar">
        <ul>
          <li> <Link to="/createpost"> Create A Post </Link> </li>
          <li> <Link to="/"> Home Page </Link> </li>
        </ul>
      </div>
      <div className='routes'>
      <Routes>
        <Route path="/" exact element={ <Home /> } />
        <Route path="/createpost" exact element={ <CreatePost /> } />
        <Route path="/operation/:id" exact element={ <Operation /> } />
      </Routes>
      </div>
     </Router>
    </div>
  );
}

export default App;
