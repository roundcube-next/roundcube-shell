export function initialize(application) {
  // FIXME: inject service:intl as 'i18n'
  application.inject('route', 'i18n', 'service:intl');
  application.inject('controller', 'i18n', 'service:intl');
  application.inject('view', 'i18n', 'service:intl');
}

export default {
  name: 'i18n',
  initialize
};
