import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  account: Ember.computed(function () {
    return this.get('store').findRecord('account');
  }),

  actions: {
    logout () {
      this.get('session').invalidate();
    }
  }
});
