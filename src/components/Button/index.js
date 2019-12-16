// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

type Props = {
  className: string,
  children: string,
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
  fullWidth?: bool,
  ghost?: bool,
  biggerText?: bool,
  route?: string,
}

function Button(props: Props) {
  const {
    className, children, onClick, fullWidth, ghost, biggerText, route,
  } = props;

  const classList = [
    s.button,
    fullWidth ? s['button--fullWidth'] : null,
    ghost ? s['button--ghost'] : null,
    biggerText ? s['button--bigger'] : null,
    className || null,
  ];

  return (
    <>
      {
        route
          ? (
            <Link className={classList.join(' ')} to={route}>
              {children}
            </Link>
          )
          : (
            <button
              className={classList.join(' ')}
              type="button"
              onClick={onClick}
            >
              {children}
            </button>
          )
      }
    </>
  );
}

Button.defaultProps = {
  fullWidth: false,
  ghost: false,
  biggerText: false,
  route: null,
};

export default Button;
