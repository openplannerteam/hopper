import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import SelectPointsReducer from './selectPointsReducer';
import DepartureSettingsReducer from './departureSettingsReducer';
import PastSearchesReducer from './pastSearchesReducer';
import SelectVehicleReducer from './selectVehicleReducer';
import UserPositionReducer from './userPositionReducer';
import tripsReducer from './tripsReducer';

function createPersistConfig(key, whitelist, blacklist) {
  const config = {
    key,
    storage,
  };

  if (whitelist) config.whitelist = whitelist;
  if (blacklist) config.blacklist = blacklist;
  return config;
}


const rootReducer = combineReducers({
  points: SelectPointsReducer,
  departureSettings: DepartureSettingsReducer,
  searches: persistReducer(createPersistConfig('pastSearches'), PastSearchesReducer),
  vehicle: persistReducer(createPersistConfig('vehicle'), SelectVehicleReducer),
  userPosition: persistReducer(createPersistConfig('userPosition', 'dismissedError'), UserPositionReducer),
  trips: tripsReducer,
});

export default rootReducer;
