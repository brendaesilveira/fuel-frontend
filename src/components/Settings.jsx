import React, { useState } from 'react';
import { countries, locations } from '../pages/Setup';
import { settings } from '../api/settings.api';
import { uploadImage } from '../api/settings.api';
import Setup from '../pages/Setup';

function Settings() {
  const [selectedCountry, setSelectedCountry] = useState('PT');
  const [selectedCity, setSelectedCity] = useState('Lisbon');
  const [image, setImage] = useState(null);

  const handleCountrySelection = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCitySelection = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleImage = ({ target }) => {
    setImage(target.files[0]);
  };

  const handleDeleteImage = () => {
    setImage(null);
    console.log('Image deleted:', image);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const requestBody = { location: { country: selectedCountry, city: selectedCity } };

      if (image) {
        const uploadData = new FormData();
        uploadData.append('file', image);

        const response = await uploadImage(uploadData);
        console.log(response.data.imgUrl);

        requestBody.imgUrl = response.data.imgUrl;
      }

      const response = await settings(requestBody);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings-container">
      <h1 className='settings'>Settings</h1>
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
      <button onClick={handleDeleteImage}>Remove profile picture</button>

    </div>
  );
}

export default Settings;
