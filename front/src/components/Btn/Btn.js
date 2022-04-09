// import dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// import style
import './btn.scss';
import LoadingButton from '@mui/lab/LoadingButton';

const Btn = ({ 
  text,
  icon,
  clicked,
  disabled,
  fullWidth,
  variant,
  color
}) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    setLoading(true);
    await clicked();
    setLoading(false);
    return () => setLoading(false);
  };
  return (
    <LoadingButton
      onClick={handleClick}
      variant={variant}
      disabled={disabled}
      loading={loading}
      loadingIndicator='Loading...'
      fullWidth={fullWidth}
      size='large'
      color={color}
    >
      <span className='btn__content'>
        {icon}
        {text}
      </span>
    </LoadingButton>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
};

Btn.defaultProps = {
  icon: null,
  clicked: () => console.log('clicked'),
  disabled: false,
  fullWidth: false,
  variant: 'text',
  color: 'secondary'
};

export default Btn;
