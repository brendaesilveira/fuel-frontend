import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectUsers } from '../api/settings.api';
import { AuthContext } from '../context/auth.context';

function Connect() {
  const [friendCode, setFriendCode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleStart = async () => {
    try {
      if (friendCode.trim() !== '') {
        const response = await connectUsers(user.userCode, friendCode);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error connecting users:', error);
      setMessage('An error occurred while connecting users');
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className='connect-page'>
      {user && user.userCode ? (
        <div className='connect-form'>
          <p className='connect-text'>Now all you need to do is share the code below with <br /> your friends and start matching:</p>
          <p className='user-code'>{user.userCode}</p>
          {showInput ? (
            <div>
              <p className='input-label'>Please enter the code below:</p>
              <input
                className='connect-input'
                type="text"
                value={friendCode}
                onChange={(e) => setFriendCode(e.target.value)}
              />
            </div>
          ) : (
            <button className='connect-link' onClick={() => setShowInput(true)}>I already have a code</button>
          )}
          <button className='start-btn' onClick={handleStart}>Start</button>
          <button className='skip-btn' onClick={handleSkip}>Skip</button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Connect;
