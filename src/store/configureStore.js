import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers/rootReducer';
// import { updateLanguage } from '../actions/settingsActions';

const loggerMiddleware = createLogger();

// TODO: uncomment
// const getParsedBrowserLanguage = () => {
//   const [language] = navigator.language.split('-');
//   return language;
// };

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,

    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );

  const persistor = persistStore(store, null, () => {
    // TODO: uncomment
    // const { settings, pastSearches } = store.getState();
    // let { language } = settings;
    // if (!language) {
    //   language = getParsedBrowserLanguage();
    // }
    //
    // store.dispatch(updateLanguage(language), pastSearches);
  });

  return { store, persistor };
}
