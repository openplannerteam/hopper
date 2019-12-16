import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppRouter from 'AppRouter';
import App from 'components/App';
import configureStore from 'store/configureStore';
import { fetchUserPosition } from './actions/userPositionActions';

function AppProvider() {
  const { store } = configureStore();

  useEffect(() => {
    store.dispatch(fetchUserPosition());
  });

  return (
    <App>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </App>
  );
}

export default AppProvider;
