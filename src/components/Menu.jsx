import { useState } from 'react';
import Settings from './Settings';

function Menu({ showSettings }) {
  return (
    <div className='menu'>
      <Settings />
    </div>
  )
}

export default Menu;
