import { createAsyncActions } from './utils';

function getPosition(options) {
  return new Promise(((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }));
}

export const fetchUserPoisitionActions = createAsyncActions('FETCH_USER_POSITION');

export const fetchUserPosition = () => (dispatch) => {
  dispatch(fetchUserPoisitionActions.request());
  return getPosition()
    .then(position => dispatch(fetchUserPoisitionActions.success(position)))
    .catch(error => dispatch(fetchUserPoisitionActions.error({ error })));
};
