import moment from 'moment';

export default function formatDuration(duration, altFormat, t) {
  const formattedDuration = moment.utc(moment.duration(duration, 's').asMilliseconds()).format('HH:mm');
  if (duration < 3600) {
    return `${moment.utc(moment.duration(duration, 's').asMilliseconds()).format(duration < 6000 ? 'm' : 'mm')} ${t('mins')}`;
  }
  if (duration < 60) {
    return `${moment.utc(moment.duration(duration, 's').asMilliseconds()).format('m')} ${t('min')}`;
  }
  return altFormat ? formattedDuration.replace(':', altFormat) : formattedDuration;
}
