import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/settings.api';
import { setup } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import uploadIcon from '../assets/img/upload-icon-orange.png';
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

const Settings = () => {
  const navigate = useNavigate();
  const { logoutUser, user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
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
    console.log('Name:', name);
    try {
      const requestBody = {
        location: { country: selectedCountry, city: selectedCity },
        _id: user._id,
        name: name,
      };

      if (image) {
        const uploadData = new FormData();
        uploadData.append('file', image);
        const response = await uploadImage(uploadData);
        requestBody.imgUrl = response.data.imgUrl;
      }

      const response = await setup(requestBody);
      setUser(response.data);
      navigate('/home');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="settings-container">
      <form className='settings-form' onSubmit={handleSubmit}>
      <h1 className='settings-h1'>Settings</h1>

      <p className='name-p'>Name</p>

      <input
      className="settings-name-input"
      type="text"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder={user.name}
      />

        <p className='location-p'>Location</p>
        <div className='select-settings-container'>
          <select className='select-settings-location' name="countries" value={selectedCountry} onChange={handleCountrySelection}>
            {Object.entries(countries).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          <br />
          <select className='select-settings-location' name="cities" value={selectedCity} onChange={handleCitySelection}>
            {locations[selectedCountry].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
          <p className='image-p'>Profile picture</p>
          <label htmlFor="image">
            <img className='upload-settings-icon' src={uploadIcon} alt="upload-img-icon" />
          </label>
          <input type="file" id="image" ref={imageInputRef} style={{ display: 'none' }} onChange={handleImage} />
        <div>
        <div className="image-name-container">
         <p className='settings-image-name'>{imageName}</p>
          {imageName !== 'No image selected' && (
          <img src={removeIcon} alt="remove-icon" className="remove-image-settings" onClick={removeImage} />
         )}
        </div>
        </div>
        <div className='save-button-container'>
        <button className='save-button' type="submit">Save</button>
        </div>
      </form>

    </div>
  );
}

export default Settings;