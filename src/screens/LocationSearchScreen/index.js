import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import InputContainer from 'components/InputContainer';
import Button from 'components/Button';
import CustomLocationButton from 'components/CustomLocationButton';
import List from 'components/List';
import autocomplete from 'api/autocomplete';
import addPastSearch from 'actions/pastSearchesActions';
import lodash from 'lodash';
import {
  fromPointSelected,
  toPointSelected,
} from 'actions/selectPointsActions';

import s from './style.module.scss';

type LocationSearchScreenProps = {
  searchId: String,
  pastSearches: Array,
  userPosition: Array,
  storeAddPastSearch: Function,
  storeToPointSelected: Function,
  storeFromPointSelected: Function,
  userPosition: Object,
}

function LocationSearchScreen(props: LocationSearchScreenProps) {
  const { searchId, pastSearches, userPosition } = props;
  const { t } = useTranslation();
  const [query, setQuery] = useState(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const searchTripRoute = '/';

  const loadData = (request) => {
    autocomplete(request).then(data => {
      setAddresses(data);
    });
  };

  const throttledSearch = lodash.throttle(loadData, 100);
  const debouncedSearch = lodash.debounce(loadData, 150);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true);
    if (e.target.value.length < 5) {
      throttledSearch(e.target.value);
    } else {
      debouncedSearch(e.target.value);
    }
    if (e.target.value.length === 0) {
      setAddresses([]);
      setIsTyping(false);
    }
  };

  const onItemClick = (e, item) => {
    const { storeAddPastSearch } = props;

    storeAddPastSearch(item.name, item.coords, '');

    if (searchId === 'from') {
      const { storeFromPointSelected } = props;
      storeFromPointSelected(item.name, item.coords);
    } else {
      const { storeToPointSelected } = props;
      storeToPointSelected(item.name, item.coords);
    }
  };

  const handlePastSearchClick = (e) => {
    const {
      storeFromPointSelected,
      storeToPointSelected,
    } = props;

    const { value } = e.currentTarget;

    if (searchId === 'from') {
      // eslint-disable-next-line no-underscore-dangle
      storeFromPointSelected(pastSearches[value].name, pastSearches[value]._source.geo[0]);
    } else {
      // eslint-disable-next-line no-underscore-dangle
      storeToPointSelected(pastSearches[value].name, pastSearches[value]._source.geo[0]);
    }
  };

  const handleGeoLocationButtonClick = () => {
    const {
      storeFromPointSelected,
      storeToPointSelected,
    } = props;

    if (searchId === 'from') {
      storeFromPointSelected(t('current_location'), { lat: userPosition.lat, lon: userPosition.lon });
    } else {
      storeToPointSelected(t('current_location'), { lat: userPosition.lat, lon: userPosition.lon });
    }
  };

  return (
    <div className={s.searchScreen}>
      <InputContainer
        type="text"
        placeholder={t('search_placeholder')}
        value={query}
        onChange={handleChange}
        labelcontent={searchId === 'from' ? 'from:' : 'to:'}
        className={s.searchInput}
      />
      {
          userPosition.lon && userPosition.lat
          && ( // only display location button if we have the data
          <CustomLocationButton
            className={s.current_location}
            route="/"
            onClick={handleGeoLocationButtonClick}
            content={t('current_location')}
          />
          )
      }

      {!isTyping && (
        <List
          array={pastSearches}
          className={s.results}
          caption={t('past_searches')}
          onItemClick={handlePastSearchClick}
          searchTripRoute={searchTripRoute}
        />
      )}

      {isTyping && (
      <List
        array={addresses || []}
        className={s.results}
        caption={t('search_results')}
        onItemClick={onItemClick}
        searchTripRoute={searchTripRoute}
      />
      )}
      <Button fullWidth ghost className={s.cancel_search} route="/">
        {t('Cancel')}
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  const { searches, userPosition } = state;
  return {
    userPosition,
    pastSearches: searches.pastSearches,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeFromPointSelected: (from, coords) => {
      dispatch(fromPointSelected(from, coords));
    },
    storeToPointSelected: (to, coords) => {
      dispatch(toPointSelected(to, coords));
    },
    storeAddPastSearch: (name, coords, agencyId) => {
      dispatch(addPastSearch(name, coords, agencyId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)((LocationSearchScreen));
