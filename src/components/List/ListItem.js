import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from '../../screens/LocationSearchScreen/style.module.scss';

export default class ListItem extends React.PureComponent {
  onClick = (e) => {
    const { onClick, item } = this.props;

    if (onClick) {
      onClick(e, item);
    }
  }

  renderList = () => {
    const {
      agencyName,
      children,
      index,
      route,
    } = this.props;

    const list = (
      <li>
        <Link
          to={route}
        >
          <button
            onClick={this.onClick}
            value={index}
            type="button"
          >
            {children}
          </button>
        </Link>
      </li>
    );

    if (agencyName === '' || agencyName === undefined) {
      return list;
    }
    return (
      <li>
        <Link
          to={route}
        >
          <button
            onClick={this.onClick}
            value={index}
            type="button"
          >
            <span className={s[agencyName]}>{agencyName}</span>
            {children}
          </button>
        </Link>
      </li>
    );
  }

  render() {
    return (
      this.renderList()
    );
  }
}

ListItem.defaultProps = {
  onClick: null,
  agencyName: '',
};

ListItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({ }).isRequired,
  route: PropTypes.string.isRequired,
  agencyName: PropTypes.string,
};
