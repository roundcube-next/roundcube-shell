export function initialize(application) {
  let detectedLocale = navigator.language || navigator.userLanguage || 'en-us';
  let i18n = application.lookup('service:i18n');

  let fallback = application.lookupFactory('locale:en/translations');
  let detected = application.lookupFactory(`locale:${detectedLocale}/translations`);

  i18n.addTranslations(detectedLocale, _.merge(fallback, detected));

  application.injection('route', 'i18n', 'service:i18n');
}

export default {
  name: 'i18n',
  initialize
};
