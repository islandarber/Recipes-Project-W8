import { useState, useEffect } from 'react';
import useContentful from './useContentful';
import './Homepage.css';
import {useNavigate} from 'react-router-dom';

const Homepage = () => {
    const [recipes, setRecipes] = useState([]);
    const { getRecipes } = useContentful();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Set loading to true when starting to fetch data
        setLoading(true);
    
        getRecipes()
          .then((allRecipes) => {
            // Shuffle the recipes and get the first three
            const shuffledRecipes = shuffleArray(allRecipes.items);
            const randomThreeRecipes = shuffledRecipes.slice(0, 3);
    
            // Update state with the fetched recipes
            setRecipes(randomThreeRecipes);
          })
          .finally(() => {
            // Set loading to false when data fetching is complete (regardless of success or failure)
            setLoading(false);
          });
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
                        <div key={recipe.sys.id} className="homepage-recipe-card" onClick={() => navigate(`${recipe.sys.id}`)}>
                            <h3>{recipe.fields.name}</h3>
                            <img src={recipe.fields.image.fields.file.url} alt="pasta" />
                            {/* <p>{recipe.fields.description}</p> */}
                        </div>
                    ))}
                </div>
            </section>}
        </div>
    );
};

export default Homepage;