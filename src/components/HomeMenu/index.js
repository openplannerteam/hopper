// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import s from './style.module.scss';

type Props = {
  className?: string,
  toRoute: string,
  settingsRoute: string,
  onClick: Function,
  t: (key: string) => string,
};

const HomeMenu = ({
  className,
  toRoute,
  settingsRoute,
  onClick,
  t,
}: Props) => (
  /* eslint-disable-next-line */
  <div className={`${s.homeMenu} ${className}`} onClick={() => onClick()}>
    <Link to={toRoute} className={s.whereToButton}>
      {t('where_to_placeholder')}
    </Link>
    <Link to={settingsRoute} className={s.menuButton}>
      {t('menu')}
      <span className={s.menuBar} />
    </Link>
  </div>
);

HomeMenu.defaultProps = {
  className: '',
};

export default withTranslation()(HomeMenu);
