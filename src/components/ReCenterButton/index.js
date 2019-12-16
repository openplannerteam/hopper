import React from 'react';
import PropTypes from 'prop-types';

const ReCenterButton = (props) => {
  const { onClick, content, className } = props;
  return (
    <button type="button" className={className} onClick={onClick}>{content}</button>
  );
};

ReCenterButton.defaultProps = {
  content: '',
  className: 'recenter',
};

ReCenterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string,
  className: PropTypes.string,
};

export default ReCenterButton;
