import {Address} from '../../../../src/contacts/models/address';

describe('the Address class', () => {

  it('should create empty Address when creating from empty object', () => {
    const result = Address.fromObject({});
    expect(result).toEqual(new Address());
  });

  it('should map all properties when creating from object', () => {
    const src = {
      type: 'Office',
      number: '221B',
      street: 'Baker Street',
      postalCode: '-',
      city: 'London',
      state: '',
      country: 'United Kingdom'
    };
    const result = Address.fromObject(src);

    for (let property in src) {
      expect(result[property]).toEqual(src[property]);
    }
  });
});
