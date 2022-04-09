// import dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import RequireAuth from '../RequireAuth/RequireAuth';
import RequireAdmin from '../RequireAdmin/RequireAdmin';
import NoAuthRequired from '../NoAuthRequired/NoAuthRequired';
import NotFound from '../NotFound/NotFound';
import Users from '../Users/Users';
import User from '../User/User';
import ContactPage from '../ContactPage/ContactPage';

// import containers
import HomeContainer from '../../Containers/HomeContainer/HomeContainer';
import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import FooterContainer from '../../Containers/FooterContainer/FooterContainer';
import PlanningContainer from '../../Containers/PlanningContainer/planningContainer';
import ShiftsContainer from '../../Containers/ShiftsContainer/ShiftsContainer';

// import style
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './app.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c63ff',
    },
    secondary: {
      main: '#0F172A',
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
            <Route path='/' element={<HomeContainer />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='/planning' element={<PlanningContainer />} />
            <Route path='/user' element={<User />} />

            <Route element={<RequireAdmin />}>
              <Route path='/users' element={<Users />} />
              <Route path='/shifts' element={<ShiftsContainer />} />
            </Route>
            
          </Route>

          <Route>
            <Route path='/contact' element={<ContactPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>

        <FooterContainer />
      </ThemeProvider>
    </div>
  );
};

export default React.memo(App);
