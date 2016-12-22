import '../../setup';
import '../../setup-validation';
import {ContactList} from '../../../../src/contacts/components/list';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contacts list component', () => {

  let gateway, sut;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['getAll']);
    sut = new ContactList(gateway);
  });

  it('should load and map contacts when activated', done => {
    const dto = [{ firstName: 'Some name' }];
    gateway.getAll.and.returnValue(Promise.resolve(dto));
    
    const expectedContacts = dto.map(Contact.fromObject);

    sut.activate()
      .then(() => expect(sut.contacts).toEqual(expectedContacts))
      .then(done);
  });
});
