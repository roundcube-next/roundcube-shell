import Ember from 'ember';

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
          uuid = controller.get('uuid');

      this.get('session').authenticate('authenticator:uuid', uuid).then(
        function () {
          self.transitionTo('index');
          pubsub.trigger('shell.authenticated');
        },
        function (message) {
          pubsub.trigger('shell.notify', message);
        }
      );
    }
  }
});
