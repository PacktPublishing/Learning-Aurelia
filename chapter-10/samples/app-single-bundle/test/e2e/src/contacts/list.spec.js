import {resetApi} from './api-mock.js';
import {ContactsListPO} from './list.po.js';
import {ContactDetailsPO} from './details.po.js';
import {ContactCreationPO} from './creation.po.js';

describe('the contacts list page', () => {
  
  let listPo, detailsPo, creationPo;

  beforeEach(done => {
    listPo = new ContactsListPO();
    detailsPo = new ContactDetailsPO();
    creationPo = new ContactCreationPO();

    resetApi().then(() => {
      browser.loadAndWaitForAureliaPage('http://127.0.0.1:9000/').then(done);
    });
  });

  it('should display the list of contacts', () => {
    expect(listPo.getTitle()).toEqual('Contacts');
    listPo.getAllContacts().then(names => {
      expect(names.length).toBeGreaterThan(0);
    });
  });

  it('should display details when clicking a contact link', () => {
    listPo.clickContactLink(0).then(clickedContact => {
      expect(detailsPo.getFullName()).toEqual(clickedContact.fullName);
    });
  });

  it('should display the creation form when clicking New', () => {
    listPo.clickNewButton();

    expect(creationPo.getTitle()).toEqual('New contact');
  });

  it('should filter the list', () => {
    const searched = 'Google';

    listPo.setFilter(searched);

    listPo.getAllContacts().then(names => {
      expect(names.every(n => n.includes(searched))).toBe(true);
    });
  });

  it('should reset unfiltered list when clicking clear filter', () => {
    let unfilteredNames;
    listPo.getAllContacts().then(names => {
      unfilteredNames = names;
    });
    listPo.setFilter('Google');

    listPo.clickClearFilter();

    listPo.getAllContacts().then(names => {
      expect(names).toEqual(unfilteredNames);
    });
  });
});
