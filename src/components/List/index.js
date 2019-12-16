import React from 'react';
import propTypes from 'prop-types';

import ListItem from './ListItem';

const List = (props) => {
  const {
    array,
    caption,
    onItemClick,
    className,
    searchTripRoute,
  } = props;
  let title;
  if (array.length > 0) {
    title = !!caption && <p>{caption}</p>;
  }
  return (
    <>
      <ul className={className}>
        {title}
        {array.map((item, index) => {
          return (
            (
              <ListItem
                agencyName={
                /* eslint-disable-next-line no-underscore-dangle */
                item._source ? item._source.agencyId : undefined
              }
                onClick={onItemClick}
                item={item}
                index={index}
                key={item.name ? (item.name + index) : index}
                route={searchTripRoute}
              >
                {item.name || item.text}
                <span>{item.location ? item.location.address1 : item.address }</span>
              </ListItem>
            )
          );
        })}
      </ul>
    </>
  );
};

List.defaultProps = {
  array: [],
  caption: '',
  onItemClick: null,
  className: '',
};

List.propTypes = {
  array: propTypes.array, // eslint-disable-line react/forbid-prop-types
  caption: propTypes.string,
  onItemClick: propTypes.func,
  className: propTypes.string,
  searchTripRoute: propTypes.string.isRequired,
};

export default List;
