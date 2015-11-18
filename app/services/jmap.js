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
   * @method setup
   * @param {String} apiUrl
   */
  setup (apiUrl) {
    this.client = this.client.withAPIUrl(apiUrl);
  }
});
