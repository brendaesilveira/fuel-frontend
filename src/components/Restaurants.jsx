import React, { useState, useEffect, useContext } from 'react';
import { allRestaurants } from "../api/restaurants.api";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import RestBg from '../assets/img/restaurants-bg.png'
import RightArrow from '../assets/img/arrow-right.png'
import LeftArrow from '../assets/img/arrow-left.png'

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
              <p className='rest-details'>{restaurants[currentRestaurantIndex].categories.title} • {restaurants[currentRestaurantIndex].price} • {restaurants[currentRestaurantIndex].rating}</p>
              <div className='next-bttn'>
              <button className='next-button' onClick={goToPreviousRestaurant} disabled={currentRestaurantIndex === 0}><img className='arrows' src={LeftArrow} /> </button>
              <button className='next-button' onClick={goToNextRestaurant} disabled={currentRestaurantIndex === restaurants.length - 1}><img className='arrows' src={RightArrow} /></button>
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
