import { useState, useEffect } from 'react';
import useContentful from './useContentful';
import { useParams } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard () {
  const [showFullIngredients, setShowFullIngredients] = useState(false)
  const [showFullInstructions, setShowFullInstructions] = useState(false)
  const [recipes, setRecipes] = useState([])
  const { getRecipes } = useContentful();
  const [loading, setLoading] = useState(false);
  // const { specificRecipeId } = useParams();
  const { id } = useParams();
  // recipes.fields.ingredients.split(',')

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

  const specificIngredients = allIngredients
    .filter((ingredient) => ingredient.id === id)
    .map((ingredient) => ingredient.ingredient);
  
    

    useEffect(() => {
      // Set loading to true when starting to fetch data
      setLoading(true);
  
      getRecipes()
        .then((allRecipes) => {
          setRecipes(allRecipes.items);
        })
        .finally(() => {
          // Set loading to false when data fetching is complete (regardless of success or failure)
          setLoading(false);
        });
    }, []);



  return (
    <>
    { loading ? <h3>Loading...</h3> :
      recipes.filter((recipe) => recipe.sys.id === id).map((recipe) => (
        <div key={recipe.sys.id} className="recipe-card"> 
          <div className="recipe-content">
            <img className="recipe-image" src={recipe.fields.image.fields.file.url} alt="pasta"  />
            <div className='ingr-instr'>
            <h2 className='card-header'>{recipe.fields.name}</h2> 
              <ul className='ingredients'>
                {specificIngredients.map((ingredient, index) =>
                  <li key={index}>{ingredient}</li>
                )}
              </ul>
              <p className='instructions'>{recipe.fields.instructions}</p>
            </div>
          </div>
        </div> 
      ))}
    </>
  )
    
}