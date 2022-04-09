// import dependencies
import React from 'react';
import UserService from '../../app/features/userHandling/UserService';

// import style and elements
import avatar from '../../assets/user.png';
import { Button } from '@mui/material';
import './usercard.scss';
import { Create, Delete } from '@mui/icons-material/';

const UserCard = ({ user, handleOpenModal, handleSetUser, handleReload }) => {
  const handleDelete = () => {
    UserService.deleteEmployee(user.id);
    handleReload();
  };

  const handleUserModification = () => {
    handleSetUser(user);
    handleOpenModal();
  };
  return (
    <div className='usercard'>
      <img className='usercard__avatar' src={avatar} alt='Profil' />
      <div className='usercard__person'>
        <p className='usercard__name'>{`${user.lastname} ${user.name}`}</p>
        <p className='usercard__id'>{user.reg_number}</p>
        <p className='usercard__role'>{`(${user.role})`}</p>
        <p className='usercard__function'>{user.function}</p>
        <p className='usercard__team'>{user.team_noun ? user.team_noun : '-'}</p>
      </div>
      <div className='usercard__buttons'>
        <Button onClick={handleUserModification}>
          <Create fontSize='large' className='usercard__button' />
        </Button>
        <Button onClick={handleDelete}>
          <Delete fontSize='large' className='usercard__button' />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
