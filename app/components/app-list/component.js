import Ember from 'ember';

export default Ember.Component.extend({
  apps: Ember.inject.service('apps'),

  navbarApps: Ember.computed(function () {
    return this.get('apps').getRoutedApps();
  })
});
