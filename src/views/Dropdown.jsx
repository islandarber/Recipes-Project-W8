import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getRecipes} from './getRecipes';
import './Dropdown.css';

const Dropdown = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Define an async function inside useEffect to be able to use await
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.log(`Error fetching recipes: ${error}`);
      }
    };

    // Call the async function
    fetchRecipes();
  }, []); 



  return (
    <div>
      <div className={`dropdown ${isOpen ? 'open' : 'dropdown'}`} onClick={handleToggle}>
        <button className="dropbtn">Recipes</button>
        <div className="dropdown-content">
          {recipes && recipes.map((recipe) => (
            <a href="#" key={recipe.id} onClick={() => navigate(`/recipes/${recipe.id}`)}>
              {recipe.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;