// import dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PlanningContainer from '../../Containers/PlanningContainer/planningContainer';
import RequireAuth from '../RequireAuth/RequireAuth';
import NoAuthRequired from '../NoAuthRequired/NoAuthRequired';
import NotFound from '../NotFound/NotFound';
import User from '../User/User';

// import style
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './app.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8675Eb',
    },
    secondary: {
      main: '#15074e',
    },
  },
});

const App = () => {
  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <HeaderContainer />
        <Routes>
          <Route element={<NoAuthRequired />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/planning' element={<PlanningContainer />} />
            <Route path="/user/:id" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
