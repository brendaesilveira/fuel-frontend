import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar"
import Menu from "../components/Menu"
import Restaurants from "../components/Restaurants"

function Home() {
const {user} = useContext(AuthContext)
const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);


const updateFavoriteRestaurants = async () => {
  setFavoriteRestaurants();
}

  return (
    <div className="home-page">
           <Restaurants updateFavoriteRestaurants={updateFavoriteRestaurants} />

    <div className="left-container">
          <Navbar />
          <Menu />
    </div>

    </div>
  );
}

export default Home;