import { ADD_PAST_SEARCH } from './actionTypes';

const addPastSearch = (name, coords, agencyId) => {
  return {
    type: ADD_PAST_SEARCH,
    name,
    _source: {
      geo: [coords],
      agencyId,
    },
  };
};

export default addPastSearch;
