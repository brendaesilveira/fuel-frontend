import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MatchBG from '../assets/img/match-background.png';

function Match({ matchedData, onClose }) {

  return (
    <div className='match-page'>
      <img className='match-bg' src={MatchBG} alt="match-background"/>
      <div className='match-container'>
        <h1 className='match-h1'>It's a match!</h1>
        <div className="restaurant-image-container">
          <img className="restaurant-image" src={matchedData.restaurantImage} alt="restaurant-picture" />
        </div>
        <p className='match-p'>Both you and {matchedData.friendName} liked {matchedData.restaurantName}</p>
        <button className='go-back-button' onClick={onClose}>Go Back</button>
      </div>
    </div>
  );
}

export default Match;
