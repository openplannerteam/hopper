import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'components/Button';
import DatetimePicker from 'components/DatetimePicker';

import s from './style.module.scss';

// =============================================================================
// Config
// =============================================================================
function defaultState() {
  return {
    date: new Date(),
    arriveBy: false,
  };
}
// =============================================================================
// Helpers
// =============================================================================


// =============================================================================
// DeparturePicker
// =============================================================================
class DeparturePicker extends React.Component {
  constructor(props) {
    super(props);
    const { date, arriveBy } = props;
    this.state = { date, arriveBy };
  }

  onDateChange = (newDate) => {
    const { onChange } = this.props;

    if (newDate) {
      const coeff = Math.floor(newDate.getMinutes() / 5);
      newDate.setMinutes(coeff * 5);
      console.log(newDate);
      console.log(moment(newDate).calendar());
    }
    this.setState({ date: newDate });
    onChange({
      ...this.state,
      date: newDate,
    });
  }

  onArriveByToggle = () => {
    const { arriveBy } = this.state;
    const { onChange } = this.props;
    const newValue = !arriveBy;
    this.setState({ arriveBy: newValue });
    onChange({
      ...this.state,
      arriveBy: newValue,
    });
  }

  onNowSubmit = () => {
    const { onSubmit } = this.props;
    this.setState(defaultState());
    onSubmit((defaultState()));
  }

  onSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const {
      onCloseClick,
      t,
      desktop,
    } = this.props;


    const { date, arriveBy } = this.state;

    // TODO: fix language for moment
    // console.log(moment(date).calendar());
    const submitButtonPrefix = (arriveBy) ? t('departure_arriveby') : t('departure_leaveat');
    return (
      <div className={`${s.leaveAtTimeModal} ${desktop ? s.desktop : ''}`}>
        <div className={s.leaveAtTimeModalContent}>
          <button type="button" className={s.closeButton} onClick={onCloseClick}>close</button>
          <div className={s.modalHeader}>
            <button
              value="leave"
              className={`${s.momentButton} ${s[(!arriveBy) ? 'active' : '']}`}
              onClick={(this.onArriveByToggle)}
              type="button"
            >
              {t('leaveat_button')}
            </button>
            <button
              value="arrive"
              className={`${s.momentButton} ${s[(arriveBy) ? 'active' : '']}`}
              onClick={this.onArriveByToggle}
              type="button"
            >
              {t('arriveby_button')}
            </button>
          </div>
          <div className={s.modalInput}>
            <DatetimePicker
              defaultValue={date}
              onChange={this.onDateChange}
              className={s.nowButton}
            />
          </div>
          <div className={s.modalFooter}>
            <Button fullWidth onClick={() => { this.onSubmit(); }}>
              {`${submitButtonPrefix} ${moment(date).calendar()}`}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


DeparturePicker.propTypes = {
  t: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  desktop: PropTypes.bool.isRequired,
  arriveBy: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default withTranslation()(DeparturePicker);
