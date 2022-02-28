import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Btn = ({ text, clicked, disabled }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    // remove the setTimeout onece we have the API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    clicked();
  };
  return (
    <LoadingButton
      onClick={handleClick}
      variant='contained'
      disabled={disabled}
      loading={loading}
      loadingIndicator='Loading...'
    >
      {text}
    </LoadingButton>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
};
Btn.defaultProps = {
  clicked: () => console.log('cliked'),
  disabled: false,
};

export default Btn;
