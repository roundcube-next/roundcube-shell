import Ember from 'ember';

/*globals jmap*/

/**
 * @class JmapService
 * @extends Ember.Service
 */
export default Ember.Service.extend({
  /**
   * The JMAP client singleton
   * @property client
   */
  client: new jmap.Client(new jmap.JQueryTransport()),

  /**
   * Assign an API url to be used for all subsequent requests
   * @method setupWithAuthenticationUrl
   * @param {String} apiUrl
   */
  setup (apiUrl) {
    this.client = this.client.withAPIUrl(apiUrl);
  },

  /**
   * Assign an authentication endpoint url for auth requests
   * @method setup
   * @param {String} authUrl
   */
  setupWithAuthenticationUrl(authUrl) {
    this.client = this.client.withAuthenticationUrl(authUrl);
  },

  /**
   * Assign access properties from an authentication request.
   * This sets endpoint urls and an access token for further JMAP requests
   * @method setupWithAuthAccess
   * @param {AuthAccess} authAccess
   * @param {String} jmapHost
   */
  setupWithAuthAccess(authAccess, jmapHost) {
    // build fully qualified API URLs
    var protocol = jmapHost.substr(0, 8);
    var jmapHostBase = protocol + jmapHost.substr(8).replace(/\/.+$/, '');
    if (authAccess.apiUrl[0] === '/') {
      authAccess.api = jmapHostBase + authAccess.apiUrl;
    }

    this.client = this.client
      .withAuthenticationToken(authAccess.accessToken)
      .withAPIUrl(authAccess.apiUrl);
  }
});
