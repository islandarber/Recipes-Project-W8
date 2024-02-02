import axios from "axios";

export const getRecipes = async () => {
  try {
    const response= await axios.get('http://localhost:8000/recipes');
    return response.data;

  } catch (error) {
    console.log(`Error fetching recipes ${error}`);
  }
}