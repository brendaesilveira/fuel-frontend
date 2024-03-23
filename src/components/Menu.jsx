import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { SettingsContext } from '../context/settings.context';
import Settings from './Settings';
import { getMatches, getFavorites } from "../api/restaurants.api";

function Menu() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [activeTab, setActiveTab] = useState('matches');
  const { showSettings } = useContext(SettingsContext);

  useEffect(() => {
    if (isLoggedIn && user.connections.length > 0) {
      const friendCode = user.connections[0].userCode;
      fetchMatches(user.userCode, friendCode);
      fetchFavoriteRestaurants(user.userCode);
    }
  }, [isLoggedIn, user.connections]);

  const fetchMatches = async (userCode, friendCode) => {
    try {
      const response = await getMatches(userCode, friendCode);
      if (Array.isArray(response.data.match)) {
        setMatches(response.data.match);
      } else {
        console.error('Matches data is not an array:', response.data.match);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchFavoriteRestaurants = async (userCode) => {
    try {
      const response = await getFavorites(userCode);
      if (Array.isArray(response.data.favourites)) {
        setFavoriteRestaurants(response.data.favourites);
      } else {
        console.error('Favorite restaurants data is not an array:', response.data.favourites);
      }
    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
    }
  };

  return (
    <div className='menu'>
      {showSettings && <Settings />}
      <div className="tab-header">
        <h3 className={activeTab === 'matches' ? 'active-tab' : ''} onClick={() => setActiveTab('matches')}>Matches</h3>
        <h3 className={activeTab === 'favourites' ? 'active-tab' : ''} onClick={() => setActiveTab('favourites')}>Favourites</h3>
      </div>
      <div className="tab-content">
        {activeTab === 'matches' && (
          <p>Matches go here</p>
        )}
        {activeTab === 'favourites' && (
          <ul>
            {favoriteRestaurants.map((restaurant, index) => (
              <li key={index}>{restaurant.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Menu;
