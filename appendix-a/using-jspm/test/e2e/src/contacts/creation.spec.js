import {resetApi} from './api-mock.js';
import {ContactsListPO} from './list.po.js';
import {ContactCreationPO} from './creation.po.js';

describe('the contact creation page', () => {
  
  let listPo, creationPo;

  beforeEach(done => {
    listPo = new ContactsListPO();
    creationPo = new ContactCreationPO();

    resetApi().then(() => {
      browser.loadAndWaitForAureliaPage('http://127.0.0.1:9000/');
      listPo.clickNewButton().then(done);
    });
  });

  it('should display errors when clicking save and form is invalid', () => {
    creationPo.setBirthday('this is absolutely not a date');
    creationPo.phoneNumbers.clickAdd();
    creationPo.emailAddresses.clickAdd();
    creationPo.addresses.clickAdd();
    creationPo.socialProfiles.clickAdd();
    
    creationPo.clickSave();

    expect(creationPo.getTitle()).toEqual('New contact');
    expect(creationPo.getValidationErrors()).toEqual([
      'Birthday must be a valid date.', 
      'Address is required.', 
      'Number is required.', 
      'Street is required.', 
      'Postal code is required.', 
      'City is required.', 
      'Country is required.', 
      'Username is required.'
    ]);
  });

  it('should create contact when clicking save and form is valid', () => {
    creationPo.setFirstName('Chuck');
    creationPo.setLastName('Norris');
    creationPo.setBirthday('1940-03-10');

    creationPo.emailAddresses.clickAdd();
    creationPo.emailAddresses.setType(0, 'Office');
    creationPo.emailAddresses.setAddress(0, 'himself@chucknorris.com');

    creationPo.clickSave();

    expect(listPo.getTitle()).toEqual('Contacts');
    expect(listPo.getAllContacts()).toContain('Chuck Norris');
  });

  it('should not create contact when clicking cancel', () => {
    creationPo.setFirstName('Steven');
    creationPo.setLastName('Seagal');

    creationPo.clickCancel();

    expect(listPo.getTitle()).toEqual('Contacts');
    expect(listPo.getAllContacts()).not.toContain('Steven Seagal');
  });
});
