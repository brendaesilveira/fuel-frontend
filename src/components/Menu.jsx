import React, { useContext, useState, useEffect } from 'react';
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
      setMatches(response.data.match.restaurants);

    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchFavoriteRestaurants = async (userCode) => {
    try {
      const response = await getFavorites(userCode);
        setFavoriteRestaurants(response.data.favourites);

    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
    }
  };

  return (
    <div className='menu'>
      {!showSettings && (
        <div className="tab-header">
          <h3 className={activeTab === 'matches' ? 'active-tab' : ''} onClick={() => setActiveTab('matches')}>Matches</h3>
          <h3 className={activeTab === 'favourites' ? 'active-tab' : ''} onClick={() => setActiveTab('favourites')}>Favourites</h3>
        </div>
      )}
      {!showSettings && (
        <div className="tab-content">
          {activeTab === 'matches' && (
            <ul className='favourites-list'>
            {matches.map((restaurant, index) => (
            <li className='fav-list-item' key={index}>
            <div className='fav-rest'>
            <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
            <p className='rest-name-favourites'>{restaurant.name}</p>
            </div>
            </li>
            ))}

            </ul>

          )}
          {activeTab === 'favourites' && (
            <ul className='favourites-list'>
            {favoriteRestaurants.map((restaurant, index) => (
            <li className='fav-list-item' key={index}>
            <div className='fav-rest'>
            <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
            <p className='rest-name-favourites'>{restaurant.name}</p>
            </div>
            </li>
            ))}

            </ul>
          )}
        </div>
      )}
      {showSettings && <div className="settings-overlay"><Settings /></div>}
    </div>
  );
}

export default Menu;
