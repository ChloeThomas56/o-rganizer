import React from 'react';
import { useSelector } from 'react-redux';

// components
import Footer from '../../components/Footer/Footer';

const FooterContainer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <Footer isLoggedIn={isLoggedIn} />;
};

FooterContainer.propTypes = {};

export default React.memo(FooterContainer);
