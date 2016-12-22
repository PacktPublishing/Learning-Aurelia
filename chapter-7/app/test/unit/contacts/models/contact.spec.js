import {Contact} from '../../../../src/contacts/models/contact';
import {Address} from '../../../../src/contacts/models/address';
import {EmailAddress} from '../../../../src/contacts/models/email-address';
import {PhoneNumber} from '../../../../src/contacts/models/phone-number';
import {SocialProfile} from '../../../../src/contacts/models/social-profile';

describe('the Contact class', () => {

  it('should create empty Contact when creating from empty object', () => {
    const result = Contact.fromObject({});
    expect(result).toEqual(new Contact());
  });

  it('should map all properties when creating from object', () => {
    const src = {
      firstName: 'Never gonna give you up',
      lastName: 'Never gonna let you down',
      company: 'Never gonna run around and desert you',
      birthday: '1987-11-16',
      note: 'Looks like you\'ve been rickrolled'
    };
    const result = Contact.fromObject(src);

    for (let property in src) {
      expect(result[property]).toEqual(src[property]);
    }
  });

  it ('should map phone numbers when creating from object', () => {
    const result = Contact.fromObject({ phoneNumbers: [{}, {}] });
    const expected = [new PhoneNumber(), new PhoneNumber()];

    expect(result.phoneNumbers).toEqual(expected);
  });

  it ('should map email addresses when creating from object', () => {
    const result = Contact.fromObject({ emailAddresses: [{}, {}] });
    const expected = [new EmailAddress(), new EmailAddress()];

    expect(result.emailAddresses).toEqual(expected);
  });

  it ('should map addresses when creating from object', () => {
    const result = Contact.fromObject({ addresses: [{}, {}] });
    const expected = [new Address(), new Address()];

    expect(result.addresses).toEqual(expected);
  });

  it ('should map social profiles when creating from object', () => {
    const result = Contact.fromObject({ socialProfiles: [{}, {}] });
    const expected = [new SocialProfile(), new SocialProfile()];

    expect(result.socialProfiles).toEqual(expected);
  });

  it('should be a person if it has a firstName and no lastName', () => {
    const sut = Contact.fromObject({ firstName: 'A first name' });
    expect(sut.isPerson).toBeTruthy();
  });

  it('should be a person if it has a lastName and no firstName', () => {
    const sut = Contact.fromObject({ lastName: 'A last name' });
    expect(sut.isPerson).toBeTruthy();
  });

  it('should be a person if it has a firstName and a lastName', () => {
    const sut = Contact.fromObject({ 
      firstName: 'A first name',
      lastName: 'A last name'
    });
    expect(sut.isPerson).toBeTruthy();
  });

  it('should not be a person if it has no firstName and no lastName', () => {
    const sut = Contact.fromObject({ company: 'A company' });
    expect(sut.isPerson).toBeFalsy();
  });

  it('should have firstName and lastName without company in fullName when it is a person', () => {
    const sut = Contact.fromObject({
      firstName: 'Rick',
      lastName: 'Astley',
      company: 'BMG'
    });
    expect(sut.fullName).toEqual('Rick Astley');
  });

  it('should have company in fullName when it is not a person', () => {
    const sut = Contact.fromObject({ company: 'ACME' });
    expect(sut.fullName).toEqual('ACME');
  });

  it('should take firstLetter from lastName when not empty', () => {
    const sut = Contact.fromObject({ lastName: 'A', firstName: 'B', company: 'C' });
    expect(sut.firstLetter).toEqual('A');
  });

  it('should take firstLetter from firstName when not empty and lastName is empty', () => {
    const sut = Contact.fromObject({ firstName: 'B', company: 'C' });
    expect(sut.firstLetter).toEqual('B');
  });

  it('should take firstLetter from company when lastName and firstName are empty', () => {
    const sut = Contact.fromObject({ company: 'C' });
    expect(sut.firstLetter).toEqual('C');
  });

  [
    [{ lastName: 'a' }, 'A'],
    [{ firstName: 'b' }, 'B'],
    [{ company: 'c' }, 'C']
  ].forEach(([src, expectedLetter]) => {
    it(`should make firstLetter uppercased (using ${Object.getOwnPropertyNames(src)[0]})`, () => {
      const sut = Contact.fromObject(src);
      expect(sut.firstLetter).toEqual(expectedLetter);
    });
  });
});
