import { handleActions } from 'redux-actions';
import { ADD_PAST_SEARCH } from '../actions/actionTypes';
import removeDuplicates from '../utils/arrayUtils';

const initialState = {
  pastSearches: [],
};

const MAX_PAST_SEARCHES = 10;

function popArrayWithoutDuplicates(array, max) {
  if (array.length < max) {
    return removeDuplicates(array, 'name');
  }
  array.pop();
  return removeDuplicates(array, 'name');
}

export default handleActions({
  [ADD_PAST_SEARCH]: (state, action) => {
    const previousSearches = [];
    previousSearches.unshift(
      {
        name: action.name,
        _source: action._source, // eslint-disable-line no-underscore-dangle
      },
      ...state.pastSearches,
    );
    return ({
      ...state,
      pastSearches: popArrayWithoutDuplicates(previousSearches, MAX_PAST_SEARCHES),
    });
  },
}, initialState);
