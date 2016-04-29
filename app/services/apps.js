import Ember from 'ember';
import _ from 'lodash';

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
