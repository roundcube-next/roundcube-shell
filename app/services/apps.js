import Ember from 'ember';

/**
 * @class AppsService
 * @extends Ember.Service
 */
export default Ember.Service.extend({
  apps: [],
  register(name, route) {
    this.apps.push({
      name,
      route
    });
  },
  getRoutedApps() {
    return _.filter(this.apps, (app) => app.route);
  }
});
