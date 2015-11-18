import DS from 'ember-data';

export default DS.Model.extend({
  name:       DS.attr('string'),
  isPrimary:  DS.attr('boolean'),
  isReadOnly: DS.attr('boolean'),
  hasMail:    DS.attr('boolean')
});
