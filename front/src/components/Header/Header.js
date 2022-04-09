// import dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

// import styles
import './header.scss';
import { Button, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';
import userAvatar from '../../assets/user.png';

const Header = ({ 
  logout,
  isLoggedIn,
  user 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <div className='header'>
      {!isLoggedIn && (
        <div className='header__banner'>
          <img className='header__banner-logo' src={logo} alt='Logo' />
          <div className='header__banner-title'>'rganizer</div>
        </div>
      )}
      {isLoggedIn && (
        <div className='header__logged'>
          <div className='header__user'>
            <NavLink to={`/user`}>
              <img
                className='header__user-avatar'
                src={userAvatar}
                alt='User avatar'
              />
            </NavLink>
            <NavLink to={`/user`}>
              <div className='header__user-details'>
                <p className='header__user-number'>{user.reg_number}</p>
                <p className='header__user-name'>
                  {user.name} {user.lastname}
                </p>
              </div>
            </NavLink>
          </div>

          <div className='header__buttons--desktop'>
            <div className='header__buttons-container'>
              {user.role === 'admin' ? (
                <React.Fragment>
                  <Link to='users'>
                      <Btn 
                        text='Utilisateurs'
                        icon={<GroupIcon />}
                        variant='text' 
                        fullWidth={true}
                        color='secondary'
                      />
                  </Link>
                  <Link to='shifts'>
                      <Btn 
                        text='Factions'
                        icon={<EventIcon />}
                        variant='text'
                        fullWidth={true}
                      />
                  </Link>
                </React.Fragment>
              ) : null}
                <Btn
                  text='Se déconnecter'
                  icon={<LogoutIcon />}
                  clicked={logout}
                  variant='text'
                  fullWidth={true}
                />
            </div>
          </div>

          <div className='header__buttons--mobile'>
            {user.role === 'admin' ? (
              <div className='header__menu'>
                <Button
                  id='demo-positioned-button'
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon fontSize='large' sx={{ color: '#0F172A' }} />
                </Button>
                <Menu
                  id='demo-positioned-menu'
                  aria-labelledby='demo-positioned-button'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to='users'>Utilisateurs</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to='shifts'>Factions</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                </Menu>
              </div>
            ) : (
              <Btn text='' icon={<LogoutIcon />} clicked={logout} variant='text' />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

Header.defaultProps = {
  logout: () => () => console.log('logout clicked'),
  user: {},
};

export default React.memo(Header);
