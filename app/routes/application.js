import _ from 'lodash';
import fetch from 'fetch';
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

function selectLocales(selectedLocales, userLocale) {
  const availableLocales = RoundcubeShell.locales;

  if (!userLocale) {
    userLocale = String(navigator.language || navigator.userLanguage || 'en-US').toLowerCase();
  }

  if (availableLocales.indexOf(userLocale) >= 0) {
    if (selectedLocales.indexOf(userLocale) < 0) {
      selectedLocales.unshift(userLocale);
    }
  } else if (userLocale.length > 2) {
    selectLocales(selectedLocales, userLocale.substr(0,2));
  }

  return selectedLocales;
}

export default Ember.Route.extend(ApplicationRouteMixin, {
  intl: Ember.inject.service(),

  beforeModel() {
    // set the app's runtime locale and load translations
    const intl = this.get('intl');
    let locales = selectLocales(['en']);

    return Ember.RSVP.all(_.map(locales, (lang) => {
        return fetch('/translations/' + lang + '.json')
          .then((response) => response.json())
          .then((hash) => intl.addTranslations(lang, hash));
      }))
      .then(() => intl.setLocale(locales));
  }
});
