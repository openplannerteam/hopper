// @flow
import React from 'react';

import s from './style.module.scss';

type Props = {
  children: Array<string>,
}

function App(props: Props) {
  const { children } = props;

  return (
    <div className={s.app}>
      {children}
    </div>
  );
}

export default App;
