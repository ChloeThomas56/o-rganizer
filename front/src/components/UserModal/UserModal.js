import React from 'react';
import { Modal, TextField, Button, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import UserService from '../../app/features/userHandling/UserService';
import userAvatar from '../../assets/user.png';
import './userModal.scss';

const UserModal = ({ user, open, handleCloseModal, handleReload }) => {
  const { handleSubmit, register, reset } = useForm();
  const handleModalReset = () => {
    reset(
      {},
      {
        keepValues: false,
      }
    );
    handleCloseModal();
    handleReload();
  };

  const handleCreate = (data) => {
    if (data.teamId === '0') {
      data.teamId = null;
    }
    UserService.addEmployee(data);
    handleModalReset();
  };

  const handleModify = (data) => {
    if (data.password === '') {
      delete data.password;

      if (data.team_id === '0') {
        data.team_id = null;
      }

      UserService.changeEmployee(user.id, data);
    } else {
      UserService.changeEmployee(user.id, data);
    }
    handleModalReset();
  };

  const getRole = (user) => {
    if (user.role === 'admin') {
      return 'admin';
    }
    return 'user';
  };

  const getTeam = (user) => {
    if (user.team_noun === 'Equipe A') {
      return '1';
    }
    if (user.team_noun === 'Equipe B') {
      return '2';
    }
    if (user.team_noun === 'Equipe C') {
      return '3';
    }
    if (user.team_noun === 'Equipe D') {
      return '4';
    }
    if (user.team_noun === 'Equipe E') {
      return '5';
    } else {
      return '0';
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalReset}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ 
        overflow:'auto',
        marginBottom: '2rem' 
      }}
    >
      {user ? (
        <div className='user-modal'>
          <div className='user-modal__main'>
            <div className='user-modal__image-container'>
              <img className='user-modal__image' src={userAvatar} alt='avatar' />
            </div>
            <div className='user-modal__info'>
              <form action='submit' className='user-modal__form'>
                <TextField
                  {...register('reg_number')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Matricule'
                  variant='outlined'
                  defaultValue={user.reg_number}
                />
                <TextField
                  {...register('password')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  type='password'
                  id='outlined-basic'
                  label='Mot de passe'
                  variant='outlined'
                />
                <TextField
                  {...register('lastname')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Nom'
                  variant='outlined'
                  defaultValue={user.lastname}
                />
                <TextField
                  {...register('name')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Prénom'
                  variant='outlined'
                  defaultValue={user.name}
                />

                <TextField
                  {...register('function')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Fonction'
                  variant='outlined'
                  defaultValue={user.function}
                />
                <Select
                  {...register(`team_id`)}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__select'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={getTeam(user)}
                  label='status'
                >
                  <MenuItem value='0'>Pas d'équipe</MenuItem>
                  <MenuItem value='1'>Equipe A</MenuItem>
                  <MenuItem value='2'>Equipe B</MenuItem>
                  <MenuItem value='3'>Equipe C</MenuItem>
                  <MenuItem value='4'>Equipe D</MenuItem>
                  <MenuItem value='5'>Equipe E</MenuItem>
                </Select>
                <Select
                  {...register('role')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__select'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={getRole(user)}
                  label='status'
                >
                  <MenuItem value='admin'>Administrateur</MenuItem>
                  <MenuItem value='user'>Utilisateur</MenuItem>
                </Select>
              </form>
            </div>
          </div>
          <Button
            sx={{ marginTop: 2 }}
            variant='contained'
            onClick={handleSubmit(handleModify)}
            type='submit'
          >
            Valider
          </Button>
        </div>
      ) : (
        <div className='user-modal'>
          <div className='user-modal__main'>
            <div className='user-modal__image-container'>
              <img className='user-modal__image' src={userAvatar} alt='avatar' />
            </div>
            <div className='user-modal__info'>
              <form action='submit' className='user-modal__form'>
                <TextField
                  {...register('regNumber')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Matricule'
                  variant='outlined'
                />
                <TextField
                  {...register('password')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  type='password'
                  id='outlined-basic'
                  label='Mot de passe'
                  variant='outlined'
                />
                <TextField
                  {...register('name')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Prénom'
                  variant='outlined'
                />
                <TextField
                  {...register('lastname')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Nom'
                  variant='outlined'
                />
                <TextField
                  {...register('function')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__input'
                  id='outlined-basic'
                  label='Fonction'
                  variant='outlined'
                />
                <Select
                  {...register(`teamId`)}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__select'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='status'
                  defaultValue='0'
                >
                  <MenuItem value='0'>Pas d'équipe</MenuItem>
                  <MenuItem value='1'>Equipe A</MenuItem>
                  <MenuItem value='2'>Equipe B</MenuItem>
                  <MenuItem value='3'>Equipe C</MenuItem>
                  <MenuItem value='4'>Equipe D</MenuItem>
                  <MenuItem value='5'>Equipe E</MenuItem>
                </Select>
                <Select
                  {...register('role')}
                  sx={{ width: 200, marginTop: 2 }}
                  className='modal__select'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='status'
                  defaultValue='user'
                >
                  <MenuItem value='admin'>Administrateur</MenuItem>
                  <MenuItem value='user'>Utilisateur</MenuItem>
                </Select>
              </form>
            </div>
          </div>
          <Button
            sx={{ marginTop: 2 }}
            variant='contained'
            onClick={handleSubmit(handleCreate)}
            type='submit'
          >
            Valider
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
