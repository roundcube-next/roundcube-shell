export function initialize(application) {
  let detectedLocaleCode = navigator.language || navigator.userLanguage || 'en-US';
  let i18n = application.lookup('service:i18n');

  let available = application.knownForType('locale');
  let sourceLocales = ['en'];
  let accumulated = {};

  function buildTranslations(code) {
    _.each(available, (present, locale) => {
      if (_.contains(locale, '/' + code + '/')) {
        let obj = {},
            app = locale.split('/')[0].split(':')[1];

        obj[app] = application.lookupFactory(locale);
        _.merge(accumulated, obj);
      }
    });
  }

  let [lang, region] = detectedLocaleCode.split('-');
  // Accumulate strings from all roundcube apps, localized in english (last fallback)
  buildTranslations('en');
  // Override those with strings from the language without the region code (fallback)
  if (region && lang !== 'en') {
    buildTranslations(lang);
  }
  // Override language-specific strings with region-specific translations
  if (detectedLocaleCode !== 'en') {
    buildTranslations(detectedLocaleCode);
  }

  // Dynamically add these translations instead of letting ember-i18n pick them up
  // FIXME: Using 'en' here is a hack to stop ember-i18n from performing it's magic lookup
  i18n.addTranslations('en', accumulated);

  application.injection('route', 'i18n', 'service:i18n');
}

export default {
  name: 'i18n',
  initialize
};
