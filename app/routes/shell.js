import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  jmap: Ember.inject.service(),
  model() {
    let request = this.get('jmap').client.getAccounts();

    return new Ember.RSVP.Promise(function(resolve, reject) {
      request.then(
      function(accounts) {
        resolve(accounts[0]);
      }, reject);
    });
  }
});
