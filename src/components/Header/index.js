// @flow
import React from 'react';
import { ReactComponent as Logo } from 'assets/images/logo-hopper.svg';

import s from './style.module.scss';

function Header() {
  return (
    <div className={s.logo}>
      <Logo
        className={s.logo__graphics}
        aria-hidden
      />
      <h1 className={s.logo__title}>Hopper</h1>
    </div>
  );
}

export default Header;
