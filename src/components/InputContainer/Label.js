import React from 'react';
import propTypes from 'prop-types';

const Label = ({
  children,
  htmlFor,
  text,
}) => (
  <>
    {/* eslint-disable-next-line */}
  <label htmlFor={htmlFor}>
    {text}
    {children}
  </label>
  </>
);

Label.propTypes = {
  children: propTypes.element.isRequired,
  htmlFor: propTypes.string,
  text: propTypes.string,
};

Label.defaultProps = {
  htmlFor: '',
  text: '',
};

export default Label;
