// @flow
import React from 'react';

import s from './style.module.scss';

type Props = {
  mode?: string,
}

function Roundel(props: Props) {
  const {
    mode,
  } = props;

  function defineColor() {
    switch (mode) {
      case 'walk': {
        return s.walk;
      }
      case 'train': {
        return s.train;
      }
      default: {
        return s.default;
      }
    }
  }

  return (
    <svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="white"
        strokeWidth="4"
        className={defineColor()}
      />
    </svg>
  );
}

Roundel.defaultProps = {
  mode: null,
};

export default Roundel;
