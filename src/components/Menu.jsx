import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { SettingsContext } from '../context/settings.context';
import Settings from './Settings';
import { getMatches, getFavorites, removeFavorite } from "../api/restaurants.api";
import Baloon from "../assets/img/baloon.png";
import removeIcon from '../assets/img/remove-icon.png';

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

  const updateFavoriteRestaurants = async () => {
    fetchFavoriteRestaurants(user.userCode);
  };

  const handleRemoveFavorite = async (restaurantId) => {
    try {
      await removeFavorite(user.userCode, restaurantId);
      updateFavoriteRestaurants();
    } catch (error) {
      console.error('Error removing favorite:', error);
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

            <div className='matches-content'>
              {matches.length === 0 ? (

                <div className='no-content-matches'>
                <img className='baloon' src={Baloon} alt="baloon-icon" />
                <h2>Start Selecting</h2>
                <p className="no-matches-text">You'll start seeing matches <br /> here once you and your friends <br /> choose the same restaurants.</p>
                <p className="no-matches-text">Start selecting the ones you like!</p>
                </div>
              )  : (

                <ul className='favourites-list'>
                  {matches.map((restaurant, index) => (
                    <li className='favourites-list-li' key={index}>

                      <div className='fav-details'>
                        <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
                        <p className='rest-name-favourites'>{restaurant.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === 'favourites' && (
            <div className='fav-content'>
              {favoriteRestaurants.length === 0 ? (
                <div className='no-content-favourites'>
                <img className='baloon' src={Baloon} alt="baloon-icon" />
                <h2>Start Selecting</h2>
                <p className="no-fav-text">Your favourite restaurants <br /> will be displayed here.</p>
                </div>
              ) : (
                <ul className='favourites-list'>
                  {favoriteRestaurants.map((restaurant, index) => (
                    <li className='favourites-list-li' key={index}>
                        <button className='remove-fav-button' onClick={() => handleRemoveFavorite(restaurant._id)}>
                        <img className='remove-fav' src={removeIcon} alt="settings" />
                        </button>
                        <div className='fav-details'>
                        <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
                        <p className='rest-name-favourites'>{restaurant.name}</p>
                        </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
      {showSettings && <div className="settings-overlay"><Settings /></div>}
    </div>
  );
}

export default Menu;

