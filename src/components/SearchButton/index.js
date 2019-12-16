import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './style.module.scss';

const SearchButton = ({
  id,
  route,
  text,
}) => (
  <Link
    id={id}
    className={s.searchButton}
    to={route}
  >
    {text}
  </Link>
);

SearchButton.propTypes = {
  id: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  route: propTypes.string.isRequired,
};

export default SearchButton;
