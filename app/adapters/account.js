import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  jmap: Ember.inject.service('jmap'),

  findRecord () {
    var request = this.get('jmap').client.getAccounts();
    // Only return the 'first' account
    return new Ember.RSVP.Promise(function (resolve, reject) {
      request.then(
      function (accounts) {
        resolve(accounts[0]);
      }, reject);
    });
  }
});
