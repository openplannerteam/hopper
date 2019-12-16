import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './style.module.scss';


function CustomLocationButton(props) {
  const {
    className,
    route,
    onClick,
    content,
  } = props;

  return (
    <Link
      className={`${s.customSelectionButtons} ${className}`}
      to={route}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}

CustomLocationButton.propTypes = {
  className: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomLocationButton;
