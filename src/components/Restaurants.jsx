import React, { useState, useEffect, useContext } from 'react';
import { allRestaurants, getLikes, getDiscards } from "../api/restaurants.api";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { handleLike, addFavorite, discardRestaurant, addBeen } from '../api/restaurants.api';
import Match from './Match';
import RestBg from '../assets/img/restaurants-bg.png';
import RightArrow from '../assets/img/arrow-right.png';
import LeftArrow from '../assets/img/arrow-left.png';
import Like from '../assets/img/like-btn.png';
import Discard from '../assets/img/discard-btn.png';
import Favourite from '../assets/img/fav-btn.png';
import Been from '../assets/img/been-btn.png';
import LoadingPage from '../components/Loading';

function Restaurants({ updateFavoriteRestaurants }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
  const [matchedData, setMatchedData] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [likedRestaurantIds, setLikedRestaurantIds] = useState([]);
  const [discardedRestaurantIds, setDiscardedRestaurantIds] = useState([]);


  const fetchRestaurants = async () => {
    try {
      const responseRestaurants = await allRestaurants(user.location.city, currentPage);
      const responseLikes = await getLikes(user.userCode);
      const responseDiscards = await getDiscards(user.userCode);
      const { likedRestaurantIds } = responseLikes.data;
      const { discardedRestaurantIds } = responseDiscards.data;
      console.log(responseDiscards.data)
      setLikedRestaurantIds(likedRestaurantIds);
      setDiscardedRestaurantIds(discardedRestaurantIds);
      const filteredRestaurants = responseRestaurants.data.restaurants.filter(restaurant =>
        ![...likedRestaurantIds, ...discardedRestaurantIds].includes(restaurant.restaurantId)
      );
      setRestaurants(filteredRestaurants);
      setTotalPages(Math.ceil(responseRestaurants.data.totalCount / 1));
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    fetchRestaurants();
    setMatchedData(null)
  };

  useEffect(() => {
    user && fetchRestaurants();
  }, [user, currentPage]);


  const goToNextRestaurant = () => {
    setCurrentRestaurantIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= restaurants.length ? prevIndex : newIndex;
    });
  };

  const goToPreviousRestaurant = () => {
    setCurrentRestaurantIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const handleLikeClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      const response = await handleLike({
        userCode: user.userCode,
        restaurantId
      });
      console.log(response)
      if (response.data.message === 'Restaurant liked and match created successfully') {
        setMatchedData({
          friendName: user.connections[0].userName,
          restaurantName: restaurants[currentRestaurantIndex].name,
          restaurantImage: restaurants[currentRestaurantIndex].image_url
        });
        setShowMatch(true);
      } else if (response.data.message === 'Match already exists for this restaurant') {
        setMatchedData({
          friendName: user.connections[0].userName,
          restaurantName: restaurants[currentRestaurantIndex].name,
          restaurantImage: restaurants[currentRestaurantIndex].image_url
        });
        setShowMatch(true);
      }
      goToNextRestaurant();
    } catch (error) {
      console.error("Error liking restaurant:", error);
    }
  };

  const handleDiscardClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      await discardRestaurant({
        userCode: user.userCode,
        restaurantId
      });
      setDiscardedRestaurantIds(previous => [...previous, restaurantId]);
      goToNextRestaurant();
    } catch (error) {
      console.error('Error discarding restaurant:', error);
    }
  };

  const handleBeenClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      await addBeen({
        userCode: user.userCode,
        restaurantId
      });
      goToNextRestaurant();
    } catch (error) {
      console.error("Error marking restaurant as been:", error);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      const response = await addFavorite({
        userCode: user.userCode,
        restaurantId
      });
      if (response.data.message === 'Restaurant added to favorites successfully') {
        updateFavoriteRestaurants();
      }
      goToNextRestaurant();
    } catch (error) {
      console.error("Error adding restaurant to favorites:", error);
    }
  };

  return (
    <div>
      {isLoggedIn && user ? (
        <>
          {matchedData && showMatch && <Match matchedData={matchedData} onClose={handleMatchClose} />}
          {!matchedData && (
            <>
              {restaurants.length > 0 ? (

                <div className='restaurants-container' key={restaurants[currentRestaurantIndex]._id}>

                  <div className='rest-image-container'>
                  <div className='rest-bg-container'>
                  <img className='rest-bg' src={RestBg} alt="restaurants-background" />
                  </div>
                  <img className='restaurant-img' src={restaurants[currentRestaurantIndex].image_url} alt="restaurant-picture" />

                  <div className='rest-details-container'>

                  <div className='rest-name'>
                  <h3>{restaurants[currentRestaurantIndex].name}</h3>
                  </div>
                  <p className='rest-details'>{restaurants[currentRestaurantIndex].categories[0].title}  <span className="dot">•</span> {restaurants[currentRestaurantIndex].price} <span className="dot">•</span> {restaurants[currentRestaurantIndex].rating}</p>
                  </div>
                  </div>


                  <div className='next-bttn-container'>
                    <button className='next-button' onClick={goToPreviousRestaurant} disabled={currentRestaurantIndex === 0}><img className='bttn-icon' src={LeftArrow} /> </button>
                    <button className='next-button' onClick={goToNextRestaurant} disabled={currentRestaurantIndex === restaurants.length - 1}><img className='bttn-icon' src={RightArrow} /></button>
                  </div>

                  <div className='activity-bttn-container'>

                  <button className='discard-button'
                  data-tooltip="Discard Restaurant"
                  onClick={handleDiscardClick}><img className='bttn-icon' src={Discard} /> </button>

                  <button className='fav-button'
                  data-tooltip="Add to Favourites"
                  onClick={handleFavoriteClick}><img className='bttn-icon' src={Favourite} /> </button>

                    <button className='been-button'
                    data-tooltip="Mark as Been"
                    onClick={handleBeenClick}><img className='bttn-icon' src={Been} /> </button>

                    <button className='like-button'
                    data-tooltip="Add to Likes"
                    onClick={handleLikeClick}><img className='bttn-icon' src={Like} /> </button>
                  </div>

                </div>
              ) : (
                  <LoadingPage />
                )}
            </>
          )}
        </>
      ) : (
          <Link to="/login">Login</Link>
        )}
    </div>
  );
}

export default Restaurants;