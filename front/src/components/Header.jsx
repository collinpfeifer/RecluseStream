import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        <i style={{ fontSize: '1.3em', paddingRight:'10%'}} className='fas fa-spider' />
        Recluse Stream
      </Link>
      <div className='right menu'>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
