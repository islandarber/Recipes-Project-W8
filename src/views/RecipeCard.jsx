import React, { useState, useEffect } from 'react';
import { getRecipes } from './useContentful';
import { useParams } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard() {
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.log(`Error fetching recipes: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);


  const specificRecipe = recipes.find((recipe) => String(recipe.id) === String(id));

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!specificRecipe) {
    return <p>No recipe found for ID: {id}</p>;
  }

  const specificIngredients = specificRecipe.ingredients.split(',').map((ingredient) => ingredient.trim());

  return (
    <div className="recipe-card">
      <div className="recipe-content">
        <img className="recipe-image" src={specificRecipe.image} alt="pasta" />
        <div className="ingr-instr">
          <h2 className="card-header">{specificRecipe.name}</h2>
          <ul className="ingredients">
            {specificIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className="instructions">{specificRecipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}
