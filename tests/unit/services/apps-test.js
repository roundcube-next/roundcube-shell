import { moduleFor, test } from 'ember-qunit';

moduleFor('service:apps', 'Unit | Service | apps', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('registers apps', function(assert) {
  let service = this.subject();

  service.register('app1');
  service.register('app2');
  service.register('app3');

  assert.equal(service.get('apps').length, 3);
});

test('filters for routed apps', function(assert) {
  let service = this.subject();

  service.register('mail', 'mail.route');
  service.register('notifications');

  assert.equal(service.getRoutedApps().length, 1);
  assert.equal(service.getRoutedApps()[0].name, 'mail');
});
