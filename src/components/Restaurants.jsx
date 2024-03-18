import React, { useState, useEffect, useContext } from 'react';
import { allRestaurants } from "../api/restaurants.api";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import RestBg from '../assets/img/restaurants-bg.png'
import RightArrow from '../assets/img/arrow-right.png'
import LeftArrow from '../assets/img/arrow-left.png'
import Like from '../assets/img/like-btn.png'
import Dislike from '../assets/img/dislike-btn.png'
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

  return (
    <div>
      {isLoggedIn && user ? (
        <>
          {restaurants.length > 0 ? (
            <div className='restaurants-container' key={restaurants[currentRestaurantIndex]._id}>
              <img className='rest-bg' src={RestBg} alt="restaurants-background" />
              <img className='restaurant-img' src={restaurants[currentRestaurantIndex].image_url} alt="restaurant-picture" />
              <h3 className='rest-name'>{restaurants[currentRestaurantIndex].name}</h3>
              <p className='rest-details'>{restaurants[currentRestaurantIndex].categories.title}  <span class="dot">•</span> {restaurants[currentRestaurantIndex].price} <span class="dot">•</span> {restaurants[currentRestaurantIndex].rating}</p>
              <div className='next-bttn-container'>
              <button className='next-button'  onClick={goToPreviousRestaurant} disabled={currentRestaurantIndex === 0}><img className='bttn-icon' src={LeftArrow} /> </button>
              <button className='next-button' onClick={goToNextRestaurant} disabled={currentRestaurantIndex === restaurants.length - 1}><img className='bttn-icon' src={RightArrow} /></button>
              </div>
              <div className='activity-bttn-container'>
              <button className='dislike-button'><img className='bttn-icon' src={Dislike} /> </button>
              <button className='refresh-button'><img className='bttn-icon' src={Refresh} /> </button>
              <button className='fav-button'><img className='bttn-icon' src={Favourite} /> </button>
              <button className='been-button'><img className='bttn-icon' src={Been} /> </button>
              <button className='like-button'><img className='bttn-icon' src={Like} /> </button>
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
