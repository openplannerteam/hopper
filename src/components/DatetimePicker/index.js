import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import s from './style.module.scss';

// =============================================================================
// Config
// =============================================================================
const DAYS_BEFORE = 5;
const DAYS_AFTER = 10;
const HOURS_SPLIT = 12;

const INPUT_DATEFORMAT = 'YYYY-MM-DDTHH:mm';
const LABEL_DATEFORMAT = 'DD-MM-YYYY HH:mm';

// =============================================================================
// Helpers
// =============================================================================

function mapTimes(hoursSplit = HOURS_SPLIT) {
  const HOURS_IN_DAY = 24;
  return [...Array(HOURS_IN_DAY * hoursSplit)].map((u, index) => {
    const hours = Math.floor(index / hoursSplit);
    const step = (index % hoursSplit);
    const minutes = step * (60 / hoursSplit);
    const date = moment().hour(hours).minute(minutes).seconds(0);
    return {
      title: date.format('HH:mm'),
      date: date.toDate(),
      value: {
        hours: date.get('hours'),
        minutes: date.get('minutes'),
      },
    };
  });
}

function mapDates(reference, daysBefore, daysAfter) {
  const days = [0, 1].map((item) => {
    const dates = [...Array(item === 0 ? daysBefore : daysAfter)].map((u, index) => {
      const date = item === 0 ? moment(reference).subtract(index, 'days') : moment(reference).add(index + 1, 'days');
      return {
        title: date.format('DD-MM-YYYY'),
        date: date.toDate(),
        value: {
          year: date.get('year'),
          month: date.get('month'),
          date: date.get('date'),
        },
      };
    });
    return item === 0 ? dates.reverse() : dates;
  });
  return days[0].concat(days[1]);
}

function roundDate(date, hoursSplit = HOURS_SPLIT) {
  const minutes = (60 / hoursSplit);
  const coeff = 1000 * 60 * minutes;
  return new Date(Math.floor(date.getTime() / coeff) * coeff);
}

function isSameTime(dateA, dateB) {
  return moment(dateA).format('HH:mm') === moment(dateB).format('HH:mm');
}

// =============================================================================
// DateTimePicker
// =============================================================================

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValue, onChange } = props;
    this.state = { date: defaultValue };
    onChange(defaultValue);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSelectChange(event) {
    const { defaultValue, onChange } = this.props;
    const { date } = this.state;
    const returnDate = moment(date).seconds(0);
    const index = event.target.value;
    const items = (event.target.name === 'time') ? mapTimes() : mapDates(defaultValue, DAYS_BEFORE, DAYS_AFTER);
    const item = items[index];
    Object.keys(item.value).map(unit => returnDate.set(unit, item.value[unit]));
    this.setState({ date: returnDate.toDate() });
    onChange(returnDate.toDate());
  }

  handleInputChange(event) {
    const { onChange } = this.props;
    const date = moment(event.target.value, INPUT_DATEFORMAT);
    onChange(date.toDate());
  }

  renderDesktop() {
    const { defaultValue } = this.props;
    const dateItems = mapDates(defaultValue, DAYS_BEFORE, DAYS_AFTER);
    const timeItems = mapTimes();
    const selectedTimeIndex = timeItems.findIndex(item => isSameTime(
      item.date,
      roundDate(defaultValue),
    ));

    return (
      <div className={s.datetimePicker}>
        <p className={s.datetimePickerLabel}>Date</p>
        <select className={s.datetimePicker__select} name="date" onChange={this.handleSelectChange} defaultValue={DAYS_BEFORE - 1}>
          {dateItems.map((item, index) => (
            <option value={index} key={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <p className={s.datetimePickerLabel}>at </p>
        <select className={s.datetimePicker__select} name="time" onChange={this.handleSelectChange} defaultValue={selectedTimeIndex}>
          {timeItems.map((item, index) => (
            <option value={index} key={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    );
  }


  renderMobile() {
    const { defaultValue, className } = this.props;
    return (
      <div className={s.datetimePicker}>
        <label htmlFor="date-picker-mobile" className={className}>
          <input
            type="datetime-local"
            defaultValue={moment(defaultValue).format(INPUT_DATEFORMAT)}
            onChange={this.handleInputChange}
            id="date-picker-mobile"
          />
          {moment(defaultValue).format(LABEL_DATEFORMAT)}
        </label>
      </div>
    );
  }

  render() {
    return ('ontouchstart' in document.documentElement) ? this.renderMobile() : this.renderDesktop();
  }
}

DateTimePicker.defaultProps = {
  defaultValue: new Date(),
  className: '',
};

DateTimePicker.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DateTimePicker;
