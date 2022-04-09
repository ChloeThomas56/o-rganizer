// import dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
// function
import { login } from '../../app/features/userAuth/userAuthSlice';
// components
import Home from '../../components/Home/Home';

const HomeContainer = () => {
  const dispatch = useDispatch();
  
  const getLogin = (credentials) => {
    try {
      dispatch(login(credentials));
    } catch (err) {
      console.log(err);
    }
  };

  return <Home getLogin={getLogin} />;
};

export default React.memo(HomeContainer);
