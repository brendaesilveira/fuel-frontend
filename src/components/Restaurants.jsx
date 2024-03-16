import React, { useState, useEffect, useContext } from 'react';
import { allRestaurants } from "../api/restaurants.api";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

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
        setTotalPages(Math.ceil(response.data.totalCount / 1)); // Assuming 1 restaurant per page
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
            <div key={restaurants[currentRestaurantIndex]._id}>
              <img className='restaurantImg' src={restaurants[currentRestaurantIndex].image_url} alt="restaurant-picture" />
              <h3>{restaurants[currentRestaurantIndex].name}</h3>
              <p>{restaurants[currentRestaurantIndex].location.city}, {restaurants[currentRestaurantIndex].location.country}</p>
              <button onClick={goToPreviousRestaurant} disabled={currentRestaurantIndex === 0}>Previous</button>
              <button onClick={goToNextRestaurant} disabled={currentRestaurantIndex === restaurants.length - 1}>Next</button>
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
