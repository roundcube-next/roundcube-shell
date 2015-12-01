import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  jmap: Ember.inject.service(),
  apps: Ember.inject.service(),

  model() {
    var request = this.get('jmap').client.getAccounts();

    return new Ember.RSVP.Promise(function (resolve, reject) {
      request.then(
      function (accounts) {
        resolve(accounts[0]);
      }, reject);
    });
  },

  redirect(model, transition) {
    if (transition.targetName === 'shell.index') {
      var routedApps = this.get('apps').getRoutedApps();
      if(routedApps.length) {
        this.replaceWith(routedApps[0].route);
      }
    }
  }
});
