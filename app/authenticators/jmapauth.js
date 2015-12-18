import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

/**
 * Create a jmap client that authenticates successfully.
 * Test by retrieving account info again from local storage.
 * @param {JmapService} jmap
 * @param {String} username
 * @param {String} password
 */
function tryAuth(jmap, username, continuationCallback) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    jmap.setupWithAuthenticationUrl(RoundcubeShell.jmapHost + '/.well-known/jmap');
    jmap.client.authenticate(username, 'RoundcubeShell', continuationCallback).then(function(authAccess) {
      jmap.setupWithAuthAccess(authAccess);
      jmap.client.getAccounts()
        .then(function(accounts) {
          let identity = Object.assign(accounts[0]);
          identity.authAccess = authAccess;
          resolve(identity);
        }, reject);
    }, reject);
  });
}

export default Base.extend({
  jmap: Ember.inject.service('jmap'),

  restore(cachedAccount) {
    let jmap = this.get('jmap');
    return new Ember.RSVP.Promise(function(resolve) {
      jmap.setupWithAuthAccess(cachedAccount.authAccess);
      resolve(cachedAccount);
    });
  },
  authenticate(username, continuationCallback) {
    return tryAuth(this.get('jmap'), username, continuationCallback);
  }
  // TODO: Add an invalidate() method when proper server auth is ready
});
