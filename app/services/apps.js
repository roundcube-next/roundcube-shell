import Ember from 'ember';

/**
 * @class AppsService
 * @extends Ember.Service
 */
export default Ember.Service.extend({
  apps: [],
  register(name, route, component) {
    this.apps.push({
      name,
      route,
      component
    });
  },
  getRoutedApps() {
    return _.filter(this.apps, (app) => app.route);
  }
});
