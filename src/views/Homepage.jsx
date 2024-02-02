import { useState, useEffect } from 'react';
import {getRecipes} from './useContentful';
import './Homepage.css';
import {useNavigate} from 'react-router-dom';

const Homepage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    setLoading(true);
    // Define an async function inside useEffect to be able to use await
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipes();
        const shuffledRecipes = shuffleArray(fetchedRecipes);
        const randomThreeRecipes = shuffledRecipes.slice(0, 3);
        setRecipes(randomThreeRecipes);
      } catch (error) {
        console.log(`Error fetching recipes: ${error}`);
      }finally{
            setLoading(false);
              };
    };

    // Call the async function
    fetchRecipes();
  }, []); 



    // Function to shuffle an array randomly
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap the elements
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    const navigate = useNavigate();

  

    return (
        <div className="homepage">
            <header>
                <h1>What's Cookin'</h1>
            </header>

            {loading ? <h3>Loading...</h3> :<section className="featured-recipes">
                <div className='homepage-container'>
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="homepage-recipe-card" onClick={() => navigate(`recipes/${recipe.id}`)}>
                            <h3>{recipe.name}</h3>
                            <img src={recipe.image} alt="pasta" />
                        </div>
                    ))}
                </div>
            </section>}
        </div>
    );
};

export default Homepage;