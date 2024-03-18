import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/settings.api';
import { setup } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import logoutIcon from '../assets/img/logout-icon.png';
import uploadIcon from '../assets/img/upload-icon.png';

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

function Setup() {
  const [selectedCountry, setSelectedCountry] = useState('PT');
  const [selectedCity, setSelectedCity] = useState('Lisbon');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { logoutUser, user, setUser } = useContext(AuthContext);

  const handleCountrySelection = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCitySelection = async (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    setSelectedCity(locations[selectedCountry][0]);
  }, [selectedCountry, locations]);

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

    const response =  await setup(requestBody);
      setUser(response.data)

      navigate('/connect');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='setup-container' style={{ backgroundColor: 'white' }}>
      <form className='setup-form' onSubmit={handleSubmit}>
        <p className='setup-text'>Enter your location</p>
        <select className='select-location' name="countries" value={selectedCountry} onChange={handleCountrySelection}>
          {Object.entries(countries).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
            <br />
        <select className='select-location' name="cities" value={selectedCity} onChange={handleCitySelection}>
          {locations[selectedCountry].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <div className='upload-paragraphs'>
          <p className='setup-text'>Upload a profile picture</p>
          <p className='optional'>optional</p>
        </div>

        <div className="image-upload">
          <label>
            <img className='upload-icon' src={uploadIcon} alt="upload-img-icon" />
          </label>
        <input type="file" id="image" onChange={handleImage} />
        </div>

        <button type="submit">Add</button>

        <button className="logout" onClick={logoutUser}>
          <img src={logoutIcon} alt="logout" />
        </button>
      </form>
    </div>
  );
}

export default Setup;