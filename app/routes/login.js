import Ember from 'ember';

/**
 * @param {AuthContinuation}
 */
function authContinue(authContinuation) {
  var method;
  authContinuation.methods.forEach((m) => {
    // check for supported methods
    if (!method && (m === 'password' || m === 'external')) {
      method = m;
    }
  });

  var controller = this.get('controller');
  controller.set('isLoading', false);

  if (!method) {
    throw new Error(this.i18n.t('shell.auth.error.unsupportedMethod'));
  }

  controller.set('authcontinue', true);
  controller.set('isPasswordAuth', method === 'password');
  controller.set('method', method);
  controller.set('password', '');
  controller.set('prompt', authContinuation.prompt || '');

  return new Ember.RSVP.Promise(function (resolve) {
    this.continueResolve = resolve;
  }.bind(this));
}

/**
 * @event shell.notify
 * Emits a notification message about login failure
 * @param {String} message The message object receiving flag updates
 */
export default Ember.Route.extend({
  session: Ember.inject.service(),
  pubsub: Ember.inject.service(),
  actions: {
    submit () {
      var self = this,
          pubsub = this.get('pubsub'),
          controller = this.get('controller'),
          username = controller.get('username'),
          authcontinue = controller.get('authcontinue');

      if (!username || username.replace(/(^\s+)|(\s+$)/g, '') === '') {
        controller.set('isLoading', true);
        pubsub.trigger('shell.notify', this.i18n.t('shell.auth.error.emptyUsername'));
      }
      else if (authcontinue && this.continueResolve) {
        controller.set('isLoading', true);
        this.continueResolve({ method: controller.get('method'), password: controller.get('password') });
      }
      else {
        controller.set('isLoading', true);
        this.get('session').authenticate('authenticator:jmapauth', username, authContinue.bind(self)).then(
          function () {
            self.transitionTo('shell.index');
            pubsub.trigger('shell.authenticated');
          },
          function (message) {
            controller.send('cancel');
            pubsub.trigger('shell.notify', message);
          }
        );
      }
    },
    cancel () {
      var controller = this.get('controller');
      controller.set('isLoading', false);
      controller.set('authcontinue', false);
      controller.set('password', '');
      controller.set('prompt', '');
    }
  }
});
