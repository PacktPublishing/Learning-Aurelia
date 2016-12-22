import {EmailAddress} from '../../../../src/contacts/models/email-address';

describe('the EmailAddress class', () => {

  it('should create empty EmailAddress when creating from empty object', () => {
    const result = EmailAddress.fromObject({});
    expect(result).toEqual(new EmailAddress());
  });

  it('should map all properties when creating from object', () => {
    const src = {
      type: 'Office',
      address: 'do-not-reply@spam.com'
    };
    const result = EmailAddress.fromObject(src);

    for (let property in src) {
      expect(result[property]).toEqual(src[property]);
    }
  });
});
