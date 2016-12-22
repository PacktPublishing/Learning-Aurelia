import {SocialProfile} from '../../../../src/contacts/models/social-profile';

describe('the SocialProfile class', () => {

  it('should create empty SocialProfile when creating from empty object', () => {
    const result = SocialProfile.fromObject({});
    expect(result).toEqual(new SocialProfile());
  });

  it('should map all properties when creating from object', () => {
    const src = {
      type: 'Twitter',
      username: '@manuguilbault'
    };
    const result = SocialProfile.fromObject(src);

    for (let property in src) {
      expect(result[property]).toEqual(src[property]);
    }
  });
});
