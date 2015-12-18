import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

/**
 * Generate API endpoints from UUID because the JMAP proxy doesn't provide them
 * @param {String} endpoint
 * @param {String} uuid Provided in the login field.
 */
function getEndpoint(endpoint, uuid) {
  return RoundcubeShell.jmapHost + {
      'api'     : '/jmap/'   + uuid,
      'events'  : '/events/' + uuid,
      'upload'  : '/upload/' + uuid,
      'download': '/raw'     + uuid + '/{blobId}/{name}'
    }[endpoint];
}

/**
 * Create a jmap client that authenticates successfully.
 * Test by retrieving account info again from local storage.
 * @param {JmapService} jmap
 * @param {String} accountId
 */
function tryAuth(jmap, accountId) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    jmap.setup(getEndpoint('api', accountId));
    jmap.client.getAccounts()
    .then(function(accounts) {
      resolve(accounts[0]);
    }, reject);
  });
}

export default Base.extend({
  jmap: Ember.inject.service('jmap'),

  restore(cachedAccount) {
    return tryAuth(this.get('jmap'), cachedAccount.id);
  },
  authenticate(uuid) {
    return tryAuth(this.get('jmap'), uuid);
  }
  // TODO: Add an invalidate() method when proper server auth is ready
});
