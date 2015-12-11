/* jshint node: true */

module.exports = function(environment) {
  var jmapHost = process.env.JMAP_HOST;
  var jmapHostName = jmapHost.replace(/([^:\/])\/.*$/, '$1');

  var ENV = {
    modulePrefix: 'roundcube-shell',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      jmapHost: jmapHost
    },
    contentSecurityPolicy: {
      'connect-src': "'self' " + jmapHostName,
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "* data:"
    },
    'simple-auth': {
      crossOriginWhitelist: [jmapHostName],
      store: 'simple-auth-session-store:local-storage',
      authenticationRoute: 'login'
    },
    'ember-cli-mirage': {
      enabled: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
