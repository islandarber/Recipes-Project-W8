import axios from "axios";

export const getRecipes = async () => {
  try {
    const response= await axios.get('https://pasta-week9.onrender.com/recipes');
    return response.data;
  } catch (error) {
    console.log(`Error fetching recipes ${error}`);
  }
}