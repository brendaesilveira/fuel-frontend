import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/settings.api';
import { setup } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import uploadIcon from '../assets/img/upload-icon.png';
import removeIcon from '../assets/img/remove-icon.png';

export const countries = {
  AU: 'Australia',
  AT: 'Austria',
  AR: 'Argentina',
  BE: 'Belgium',
  BR: 'Brazil',
  CA: 'Canada',
  CL: 'Chile',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  FI: 'Finland',
  FR: 'France',
  DE: 'Germany',
  HK: 'Hong Kong',
  IT: 'Italy',
  JP: 'Japan',
  MY: 'Malasya',
  MX: 'Mexico',
  NZ: 'New Zeland',
  NO: 'Norway',
  PH: 'Philippines',
  PL: 'Poland',
  PT: 'Portugal',
  IE: 'Republic of Ireland',
  SG: 'Singapore',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  TW: 'Taiwan',
  NL: 'The Netherlands',
  TR: 'Turkey',
  GB: 'United Kingdom',
  US: 'United States'
};

export const locations = {
  AU: ['Brisbane', 'Melbourne', 'Sydney'],
  AT: ['Wien'],
  AR: ['Buenos Aires'],
  BE: ['Antwerpen', 'Bruxelles'],
  BR: ['Rio de Janeiro', 'São Paulo'],
  CA: ['Ottawa', 'Toronto', 'Vancouver'],
  CL: ['Santiago'],
  CZ: ['Praha'],
  DK: ['København'],
  FI: ['Helsinki'],
  FR: ['Lyon', 'Marseille', 'Paris'],
  DE: ['Berlin', 'Frankfurt am Main', 'München'],
  HK: ['香港'],
  IT: ['Milano', 'Roma'],
  JP: ['大阪市', '東京'],
  MY: ['Kuala Lumpur'],
  MX: ['México, D.F.'],
  NZ: ['Auckland'],
  NO: ['Oslo'],
  PH: ['Manila'],
  PL: ['Kraków', 'Warszawa'],
  PT: ['Lisbon'],
  IE: ['Dublin'],
  SG: ['Singapore'],
  ES: ['Barcelona', 'Madrid'],
  SE: ['Stockholm'],
  CH: ['Zürich'],
  TW: ['台北市'],
  NL: ['Amsterdam'],
  TR: ['İstanbul'],
  GB: ['Belfast', 'Cardiff', 'Edinburgh', 'Glasgow', 'Liverpool', 'London', 'Manchester'],
  US: ['Chicago', 'Los Angeles', 'New York', 'San Francisco']
};

const Setup = () => {
  const navigate = useNavigate();
  const { logoutUser, user, setUser } = useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState('PT');
  const [selectedCity, setSelectedCity] = useState('Lisbon');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('No image selected');
  const imageInputRef = useRef(null);

  useEffect(() => {
    setSelectedCity(locations[selectedCountry][0]);
  }, [selectedCountry]);

  const handleCountrySelection = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCitySelection = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleImage = ({ target }) => {
    const file = target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const removeImage = () => {
    setImage(null);
    setImageName('No image selected');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = { location: { country: selectedCountry, city: selectedCity }, _id: user._id };

      if (image) {
        const uploadData = new FormData();
        uploadData.append('file', image);
        const response = await uploadImage(uploadData);
        requestBody.imgUrl = response.data.imgUrl;
      }

      const response = await setup(requestBody);
      setUser(response.data);
      navigate('/connect');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='setup-container' style={{ backgroundColor: 'white' }}>
      <form className='setup-form' onSubmit={handleSubmit}>
        <p className='location-text'>Enter your location <span className="mandatory">*</span></p>
        <div className='select-container'>
          <select className='select-location' name="countries" value={selectedCountry} onChange={handleCountrySelection}>
            {Object.entries(countries).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          <br />
          <select className='select-location' name="cities" value={selectedCity} onChange={handleCitySelection}>
            {locations[selectedCountry].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className='upload-paragraphs'>
          <p className='image-text'>Upload a profile picture</p>
          <p className='optional'>optional</p>
        </div>
        <div className="image-upload">
          <label htmlFor="image">
            <img className='upload-icon' src={uploadIcon} alt="upload-img-icon" />
          </label>
          <input type="file" id="image" ref={imageInputRef} style={{ display: 'none' }} onChange={handleImage} />
        </div>
        <div className='image-container'>
          <p className='image-name'>{imageName}</p>
          {imageName !== 'No image selected' && (
            <img src={removeIcon} alt="remove-icon" className="remove-image" onClick={removeImage} />
          )}
        </div>
        <button className='add-button' type="submit">Add</button>
        <button className="logout" onClick={logoutUser}>Logout</button>
      </form>
    </div>
  );
}

export default Setup;