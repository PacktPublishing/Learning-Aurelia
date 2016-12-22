import {ContactList} from '../../../../src/contacts/components/list';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contacts list component', () => {

  let gateway, sut;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['getAll']);
    sut = new ContactList(gateway);
  });

  it('should load and map contacts when activated', done => {
    const contacts = [{ firstName: 'Some name' }].map(Contact.fromObject);
    gateway.getAll.and.returnValue(Promise.resolve(contacts));
    
    sut.activate()
      .then(() => expect(sut.contacts).toEqual(contacts))
      .then(done);
  });
});
