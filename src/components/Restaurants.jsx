import React, { useState, useEffect, useContext } from 'react';
import { allRestaurants } from "../api/restaurants.api";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import {handleLike, addFavorite, discardRestaurant, addBeen} from '../api/restaurants.api';
import RestBg from '../assets/img/restaurants-bg.png'
import RightArrow from '../assets/img/arrow-right.png'
import LeftArrow from '../assets/img/arrow-left.png'
import Like from '../assets/img/like-btn.png'
import Discard from '../assets/img/discard-btn.png'
import Favourite from '../assets/img/fav-btn.png'
import Been from '../assets/img/been-btn.png'
import Refresh from '../assets/img/refresh-btn.png'

function Restaurants() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await allRestaurants(user.location.city, currentPage);
        setRestaurants(response.data.restaurants);
        setTotalPages(Math.ceil(response.data.totalCount / 1));
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, [user.location.city, currentPage]);

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

  const handleDiscardClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      await discardRestaurant({
        userCode,
        restaurantId
      });

      goToNextRestaurant();
    } catch (error) {
      console.error("Error discarding restaurant:", error);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      const response = await addFavorite({
        userCode,
        restaurantId
      });
      if (response.data.message === 'Restaurant added to favorites successfully') {
        alert('Restaurant added to favorites!');
      }
    } catch (error) {
      console.error("Error adding restaurant to favorites:", error);
    }
  };

  const handleBeenClick = async () => {
    try {
      const restaurantId = restaurants[currentRestaurantIndex]._id;
      await addBeen({
        userCode,
        restaurantId
      });
      goToNextRestaurant();
    } catch (error) {
      console.error("Error marking restaurant as been:", error);
    }
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
        alert('Its a match');
      }
    } catch (error) {
      console.error("Error liking restaurant:", error);
    }
  };

  return (
    <div>
      {isLoggedIn && user ? (
        <>
          {restaurants.length > 0 ? (
            <div className='restaurants-container' key={restaurants[currentRestaurantIndex]._id}>
              <img className='rest-bg' src={RestBg} alt="restaurants-background" />
              <img className='restaurant-img' src={restaurants[currentRestaurantIndex].image_url} alt="restaurant-picture" />
              <h3 className='rest-name'>{restaurants[currentRestaurantIndex].name}</h3>
              <p className='rest-details'>{restaurants[currentRestaurantIndex].categories.title}  <span className="dot">•</span> {restaurants[currentRestaurantIndex].price} <span className="dot">•</span> {restaurants[currentRestaurantIndex].rating}</p>
              <div className='next-bttn-container'>
              <button className='next-button'  onClick={goToPreviousRestaurant} disabled={currentRestaurantIndex === 0}><img className='bttn-icon' src={LeftArrow} /> </button>
              <button className='next-button' onClick={goToNextRestaurant} disabled={currentRestaurantIndex === restaurants.length - 1}><img className='bttn-icon' src={RightArrow} /></button>
              </div>
              <div className='activity-bttn-container'>
              <button className='discard-button' onClick={handleDiscardClick}><img className='bttn-icon' src={Discard} /> </button>
              <button className='refresh-button'><img className='bttn-icon' src={Refresh} /> </button>
              <button className='fav-button' onClick={handleFavoriteClick}><img className='bttn-icon' src={Favourite} /> </button>
              <button className='been-button' onClick={handleBeenClick}><img className='bttn-icon' src={Been} /> </button>
              <button className='like-button' onClick={handleLikeClick}><img className='bttn-icon' src={Like} /> </button>
              </div>
            </div>
          ) : (
            <p>No restaurants found</p>
          )}
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Restaurants;
