import LoadingGif from '../assets/img/loading.gif'
import { Link } from 'react-router-dom'

function Loading() {
  return (
    <div className='loading-page'>
        <img src={LoadingGif} alt="loading-gif" />
        <Link className='loading-link' to={`/setup`}>Back</Link>

    </div>
  )
}

export default Loading