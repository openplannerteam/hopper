// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import { ReactComponent as Bike } from 'assets/images/icon-bike.svg';

import s from './style.module.scss';

type Props = {
  children: String,
  title: String,
  illustration?: String,
  btn: String,
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
  isLoader?: Boolean,
}

function Popup(props: Props) {
  const {
    children, title, illustration, btn, onClick, isLoader,
  } = props;
  const { t } = useTranslation();
  const fact = Math.floor(Math.random() * (5 - 0 + 1) + 0);

  if (isLoader) {
    return (
      <div className={s.popup}>
        <div className={[s.popup__container, s['popup__container--loader']].join(' ')}>
          <div className={s.popup__title}>
            {t('loader.title')}
          </div>
          <div className={s.popup__animation}>
            <div className={s.popup__animation__sky}>
              <div className={s.popup__animation__cloud} />
              <div className={s.popup__animation__cloud} />
              <div className={s.popup__animation__cloud} />
            </div>
            <div className={s.popup__animation__bikeContainer}>
              <div className={s.popup__animation__bikeContainer__trails}>
                <div className={s.popup__animation__bikeContainer__trail} />
                <div className={s.popup__animation__bikeContainer__trail} />
                <div className={s.popup__animation__bikeContainer__trail} />
              </div>
              <div className={s.popup__animation__bikeContainer__bike}>
                <Bike width={66} height={40} />
              </div>
            </div>
            <div className={s.popup__animation__road} />
          </div>
          <div className={s.popup__fact}>
            <div className={s.popup__fact__title}>
              {t('loader.fact_subtitle')}
            </div>
            <div className={s.popup__fact__content}>
              {t(`loader.facts.${fact}`)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.popup}>
      <div className={s.popup__container}>
        <div className={s.popup__title}>
          {title}
        </div>
        <div className={s.popup__illustration}>
          {illustration}
        </div>
        <div className={s.popup__body}>
          {children}
        </div>
        <div className={s.popup__btn}>
          <Button
            fullWidth
            onClick={() => {
              onClick();
            }}
          >
            {btn}
          </Button>
        </div>
      </div>
    </div>
  );
}

Popup.defaultProps = {
  isLoader: false,
  illustration: null,
};

export default Popup;
