import Dropdown from "./Dropdown";
import logo from '../assets/farfalle.png'
import searchIcon from '../assets/search.png'
import './Navbar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useContentful from './useContentful'



const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const { getRecipes } = useContentful();
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((res) => {
      setRecipes(res.items);
    });
  }, []);


  const allIngredients = recipes.flatMap((recipe) => {
    // Check if 'fields' is defined for the current recipe
    if (recipe && recipe.fields && recipe.fields.ingredients) {
      const ingredientsArray = recipe.fields.ingredients.split(',').map((ingredient) => ingredient.trim());
      
      const recipeId = recipe.sys.id; // Get the recipe ID
      return ingredientsArray.map((ingredient) => ({
        id: recipeId,
        ingredient,
      }));
    }
    return [];
  });


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === 'pasta' || e.target.value === 'Pasta') {
      alert('Not Pasta obviously, something else')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const matchingIngredients = allIngredients.filter(
      (ingredient) => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    allIngredients.forEach(ingredient => console.log(ingredient));
    
  
    if (matchingIngredients.length === 0) {
      alert('No results found');
    } else {
      setResults(matchingIngredients);
      const firstIngredient = matchingIngredients[0];
      navigate(`${firstIngredient.id}`);
    }

    setSearchTerm(''); // clear the search field

  };
  
  


  return (
    <div className="navbar-container">
      <nav className="Navbar">
        <ul>
          <NavLink to="/"><img className="logo" src={logo} alt='logo'/></NavLink>
          <NavLink to="/" >Homepage</NavLink>
          <li>
            <Dropdown/>
          </li>
          <NavLink to="/gallery">Gallery</NavLink>
        </ul>
        <div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} placeholder="Search Ingredients..." onChange={handleChange} className='searchbar'/>
          <button type="submit" className="search-button">
            <img className="search-icon" src={searchIcon} alt='search icon'/>
          </button>
        </form>
      </div>
    </div>
      </nav>
    </div>
  )
  }

export default NavBar;