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

    ['apiUrl', 'uploadUrl', 'downloadUrl', 'eventSourceUrl'].forEach((prop) => {
      if (authAccess[prop][0] === '/') {
        authAccess[prop] = jmapHostBase + authAccess[prop];
      }
    });

    // cast into an acutal jmap.AuthAccess instance of coming from cache
    if (!(authAccess instanceof jmap.AuthAccess)) {
      authAccess = new jmap.AuthAccess(authAccess);
    }

    this.client = this.client.withAuthAccess(authAccess);
  }
});
