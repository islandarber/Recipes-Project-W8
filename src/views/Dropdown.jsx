import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useContentful from './useContentful';
import './Dropdown.css';

const Dropdown = () => {
  const [recipes, setRecipes] = useState([]);
  const { getRecipes } = useContentful();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((recipes) => {
      setRecipes(recipes.items);
    });
  }, []);



  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Recipes</button>
        <div className="dropdown-content">
          {recipes.map((recipe) => (
            <a href="#" key={recipe.sys.id} onClick={() => navigate(`${recipe.sys.id}`)}>
              {recipe.fields.name} {recipe.type}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;