export function initialize(application) {
  var detectedLocale = navigator.language || navigator.userLanguage || 'en-us';
  application.lookup('service:i18n').set('locale', detectedLocale);
}

export default {
  name: 'i18n',
  initialize
};
