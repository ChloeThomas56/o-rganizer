import React, { useState, useEffect } from 'react';
import './user.scss';
import avatar from '../../assets/user.png';
import userService from '../../app/features/userHandling/UserService';
import Btn from '../Btn/Btn';
import { useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const User = () => {
  const defaultValues = {
    password: '',
  };
  const userId = useSelector((state) => state.auth.user.id);

  const [user, setUser] = useState([]);
  const [modif, setModif] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = () => {
    if (formValues.password === formValues.confirmPassword) {
      userService.patchUser(userId, formValues);
      setModif(false);
    } else {
      toast.error('La confirmation du mot de passe est incorrecte');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    userService.getUser(userId).then((res) => setUser(res.data));
  }, []);

  return (
    <div className='user'>
      <div className='user__container'>
        <img className='user__avatar' src={avatar} alt='Avatar' />

        <form
          className='user__form'
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        >
          <div className='user__info-container'>
            <p className='user__title'>Matricule</p>
            <p className='user__content'>{user.reg_number}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Prénom</p>
            <p className='user__content'>{user.name}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>NOM</p>
            <p className='user__content'>{user.lastname}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Mot de passe</p>
            {modif ? (
              <div className='user__content user__password-container'>
                <TextField
                  sx={{ width: 250 }}
                  id='password'
                  label='Modifier'
                  name='password'
                  type='password'
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <TextField
                  sx={{ width: 250 }}
                  id='confirmPassword'
                  label='Confirmer'
                  name='confirmPassword'
                  type='password'
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className='user__content'>
                <Button
                  onClick={() => setModif(true)}
                  variant='contained'
                  sx={{ width: 200, marginTop: 1.5, marginBottom: 1.5 }}
                >
                  Modifier
                </Button>
              </div>
            )}
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Fonction</p>
            <p className='user__content'>{user.function}</p>
          </div>
          <div className='user__info-container'>
            <p className='user__title'>Equipe</p>
            <p className='user__content'>{user.team ? user.team : '-'}</p>
          </div>

          <div className='user__buttons'>
            {modif && <Btn text='Valider' clicked={handleSubmit} variant='contained' color='primary'/>}
            <NavLink to='/planning'>
              <Btn text='Retour' variant='contained' color='primary'/>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

User.propTypes = {};

export default User;
