import React, { useState } from 'react';
import { countries, locations } from '../pages/Setup';
import Setup from '../pages/Setup';
import { settings } from '../api/settings.api';

function Settings() {
  const [selectedCountry, setSelectedCountry] = useState('PT');
  const [selectedCity, setSelectedCity] = useState('Lisboa');

  const handleCountrySelection = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCitySelection = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleImage = ({target}) => {
    setImage(target.files[0])
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = { location: {country: selectedCountry, city: selectedCity}, _id: user._id };

      if (image) {
        const uploadData = new FormData()
        uploadData.append('file', image)

        const response = await uploadImage(uploadData);
        console.log(response.data.imgUrl)

        requestBody.imgUrl = response.data.imgUrl
      }

    const response =  await settings(requestBody);
      setUser(response.data)

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="menu">
      <h1>Settings</h1>
      <Setup
        countries={countries}
        locations={locations}
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        handleCountrySelection={handleCountrySelection}
        handleCitySelection={handleCitySelection}
        handleImage={handleImage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Settings;