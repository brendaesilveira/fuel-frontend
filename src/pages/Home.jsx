import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Restaurants from "../components/Restaurants";
import { getFavorites } from "../api/restaurants.api";

function Home() {
  const { user } = useContext(AuthContext);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  const fetchFavoriteRestaurants = async () => {
    try {
      const response = await getFavorites(user.userCode);
      setFavoriteRestaurants(response.data.favourites);
    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
    }
  };

  const updateFavoriteRestaurants = async () => {
    fetchFavoriteRestaurants();
  };

  useEffect(() => {
    fetchFavoriteRestaurants();
  }, []);

  return (
    <div className="home-page">
      <Restaurants updateFavoriteRestaurants={updateFavoriteRestaurants} />
      <div className="left-container">
        <Navbar />
        <Menu favoriteRestaurants={favoriteRestaurants} updateFavoriteRestaurants={updateFavoriteRestaurants} />
      </div>
    </div>
  );
}

export default Home;