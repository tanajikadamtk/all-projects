import { Link, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './App.css'
import Home from './pages/Home'
import ProductList from './components/ProductList';
import RecipesList from './components/RecipesList ';
import StudentList from './components/StudentList';
import NotFound from './pages/NotFound';


function App() {

  return (
      <div className='w-100'>  
       <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/productlist">Product List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/recipeslist">Recipes List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/studentlist">Student List</Link></li>
            </ul>
          </div>
        </div>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/recipeslist" element={<RecipesList />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  )
}

export default App
