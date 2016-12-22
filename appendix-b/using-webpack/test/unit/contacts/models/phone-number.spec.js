import '../../setup';
import '../../setup-validation';
import {PhoneNumber} from '../../../../src/contacts/models/phone-number';

describe('the PhoneNumber class', () => {

  it('should create empty PhoneNumber when creating from empty object', () => {
    const result = PhoneNumber.fromObject({});
    expect(result).toEqual(new PhoneNumber());
  });

  it('should map all properties when creating from object', () => {
    const src = {
      type: 'Mobile',
      number: '1234567890'
    };
    const result = PhoneNumber.fromObject(src);

    for (let property in src) {
      expect(result[property]).toEqual(src[property]);
    }
  });
});
