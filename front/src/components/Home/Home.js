// import dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import style and elements
import './home.scss';
import { TextField, Paper } from '@mui/material';
import login from '../../assets/login.png';

// import components
import Btn from '../Btn/Btn';

const defaultValues = {
  regNumber: '',
  password: '',
};

const Home = ({ getLogin }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (formValues.regNumber === '' || formValues.password === '') {
        toast.error('Tous les champs sont requis');
        return;
      }
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (formValues.regNumber === '' || formValues.password === '') {
      toast.error('Tous les champs sont requis');
      return;
    }
    try {
      getLogin(formValues);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='home'>
      <div className='home__container'>
      <img className='home__img' src={login} alt='Illustration' />
      <Paper 
        className='home__paper' 
        elevation={0} 
        sx={{backgroundColor: '#f7f1ff'}}
      >
        <h2 className='home__title'>
          Connectez-vous pour accéder à votre planning
        </h2>
        <form
          className='home__form'
          action='submit'
          onSubmit={handleLogin}
          onKeyPress={handleKeyPress}
        >
          <div className='home__form-textfield'>
            <TextField
              id='regNumber'
              label='Matricule'
              name='regNumber'
              type='text'
              value={formValues.regNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className='home__form-textfield'>
            <TextField
              id='password'
              label='Mot de passe'
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className='home__form-textfield'>
            <Btn
              text='Se connecter'
              fullWidth={true}
              disabled={
                !(
                  formValues.regNumber.length > 4 &&
                  formValues.password.length > 4
                )
              }
              clicked={handleLogin}
              variant='contained'
              color='primary'
            />
          </div>
        </form>
      </Paper>
      </div>
    </div>
  );
};

Home.propTypes = {
  getLogin: PropTypes.func.isRequired,
}

export default Home;
