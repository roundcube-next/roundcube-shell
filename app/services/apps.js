import Ember from 'ember';

/**
 * @class AppsService
 * @extends Ember.Service
 */
export default Ember.Service.extend({
  apps: [],
  register(name, route, component) {
    this.apps.push({
      name: name,
      route: route,
      component: component
    });
  },
  getRoutedApps() {
    return _.filter(this.apps, function (app) {
      return app.route;
    });
  }
});
