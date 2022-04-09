// import dependencies
import React, { useState, useEffect } from 'react';
import UserService from '../../app/features/userHandling/UserService';
import { Link } from 'react-router-dom';

// import components
import UserCard from '../UserCard/UserCard';
import UserModal from '../UserModal/UserModal';

// import style and elements
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './users.scss';

const Users = () => {
  const [users, setUsers] = useState();
  const [modalUser, setModalUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    UserService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, [reload]);

  const handleReload = () => {
    setReload(reload + 1);
  };
  const handleSetUser = (user) => {
    setModalUser(user);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEmptyUser = () => {
    setModalUser(null);
    handleOpenModal();
  };

  return (
    <div className='users'>
      <UserModal
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        user={modalUser}
        handleReload={handleReload}
      />
      <div className='users__title'>Gestion des utilisateurs</div>
      <div className='users__buttons'>
        <Button variant='contained'>
          <Link to='/planning'>Retour</Link>
        </Button>
        <Button variant='contained' onClick={handleEmptyUser}>
          <AddIcon />
        </Button>
      </div>
      <div className='users__main'>
        {users &&
          users.map((user) => (
            <UserCard
              handleOpenModal={handleOpenModal}
              handleSetUser={handleSetUser}
              key={user.id}
              user={user}
              handleReload={handleReload}
            />
          ))}
      </div>
    </div>
  );
};

export default Users;
