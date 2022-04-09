// import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import style and elements
import './footer.scss';
import logo from '../../assets/logo.png';

const Footer = ({isLoggedIn}) => {
  return (
  <div className='footer'>
    {isLoggedIn ? (
      <div className='footer__banner'>
        <img className='footer__banner-logo' src={logo} alt='Logo' />
        <div className='footer__banner-title'>'rganizer</div>
      </div>
    ) :
      <Link to='/contact'>
        <p className='footer__link'>Qui sommes-nous ?</p>
      </Link>
    }
  </div>
  );
};

Footer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}
  
export default React.memo(Footer);
