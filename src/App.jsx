import './App.css'
import NavBar from './views/Navbar';
import Homepage from './views/Homepage';
import { Routes, Route } from 'react-router-dom';
import RecipeCard from './views/RecipeCard';
import Footer from './views/Footer';
import Gallery from './views/Gallery';

function App() {


  return (
    <>
    <div className='container'>
      <NavBar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/:id' element={<RecipeCard />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
