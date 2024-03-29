import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import defaultProfileImg from '../assets/img/user-default-icon.png';
import fireIconWht from '../assets/img/fire-icon-white.png'
import { getBeen, getLikes } from "../api/restaurants.api";
import { Link } from 'react-router-dom';

function Profile() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('been');
  const [beenRestaurants, setBeenRestaurants] = useState([]);
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBeenRestaurants(user.userCode);
      fetchLikedRestaurants(user.userCode);
    }
  }, [isLoggedIn]);

  const fetchBeenRestaurants = async (userCode) => {
    try {
      const response = await getBeen(userCode);
      if (Array.isArray(response.data.been)) {
        setBeenRestaurants(response.data.been);
      } else {
        console.error('Been restaurants data is not an array:', response.data.been);
      }
    } catch (error) {
      console.error('Error fetching been restaurants:', error);
    }
  };

  const fetchLikedRestaurants = async (userCode) => {
    try {
      const response = await getLikes(userCode);
      if (Array.isArray(response.data.likes)) {
        setLikedRestaurants(response.data.likes);
      } else {
        console.error('Liked restaurants data is not an array:', response.data.likes);
      }
    } catch (error) {
      console.error('Error fetching liked restaurants:', error);
    }
  };

  return (
    <div className='profile'>
      {isLoggedIn && user ? (
        <>
          <nav className='profile-nav'>
          <Link className='profile-nav-link' to={`/home`}>
          <img className='profile-nav-icon' src={fireIconWht} alt="fuel-icon" />
          </Link>
          </nav>

          <div className='profile-page'>

          <div className='profile-details-container'>
          {user.profilePicture ? (
            <img className='profile-profileImg' src={user.profilePicture} alt="profile-picture" />
          ) : (
            <img className='profile-profileImg' src={defaultProfileImg} alt="profile-img" />
          )}
          <p className='profile-username'>{user.name}</p>
          <p className='profile-userlocation'>{user.location.city}, {user.location.country}</p>
          </div>
          <div className="profile-tab-content-wrapper">
          <div className="profile-tab-container">
          <h3 className={activeTab === 'been' ? 'profile-active-tab' : ''} onClick={() => setActiveTab('been')}>Been</h3>
          <h3 className={activeTab === 'likes' ? 'profile-active-tab' : ''} onClick={() => setActiveTab('likes')}>Liked</h3>
          </div>

          <div className="tab-content-container">
           {activeTab === 'been' && (
            <ul className='restaurants-list'>
            {beenRestaurants.map((restaurant, index) => (
            <li className='restaurant-list-li' key={index}>
            <div className='fav-details'>
            <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
            <p className='rest-name-favourites'>{restaurant.name}</p>
            </div>
            </li>
            ))}
            </ul>
          )}
          {activeTab === 'likes' && (
            <ul className='restaurants-list'>
            {likedRestaurants.map((restaurant, index) => (
            <li className='restaurant-list-li' key={index}>
            <div className='fav-details'>
            <img className='rest-img-favourites' src={restaurant.image_url} alt={restaurant.name} />
            <p className='rest-name-favourites'>{restaurant.name}</p>
            </div>
            </li>
            ))}
            </ul>
          )}
          </div>
          </div>
          </div>
        </>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
}

export default Profile;
