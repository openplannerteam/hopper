import { createAction } from 'redux-actions';

export const createAsyncActions = (type, payloadMapper) => ({
  request: createAction(`REQUEST_${type}`, payloadMapper),
  error: createAction(`ERROR_${type}`, payloadMapper),
  success: createAction(`SUCCESS_${type}`, payloadMapper),
});

export default {
  createAsyncActions,
};
