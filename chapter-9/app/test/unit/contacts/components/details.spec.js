import {ContactDetails} from '../../../../src/contacts/components/details';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contact details component', () => {

  let gateway, sut, routerConfig;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['getById']);
    sut = new ContactDetails(gateway);

    routerConfig = {
      navModel: jasmine.createSpyObj('routerConfig.navModel', ['setTitle'])
    };
  });

  function activate(id) {
    return sut.activate({ id }, routerConfig);
  }


  it('should load and map contact when activated', done => {
    const id = 12;
    const dto = { id, firstName: 'Some name' };
    gateway.getById.and.returnValue(Promise.resolve(dto));

    const expectedContact = Contact.fromObject(dto);

    activate(id)
      .then(() => expect(gateway.getById).toHaveBeenCalledWith(id))
      .then(() => expect(sut.contact).toEqual(expectedContact))
      .then(done);
  });

  it('should set fullName as document title when activated', done => {
    const id = 23;
    const dto = { id, firstName: 'Some', lastName: 'Name' };
    gateway.getById.and.returnValue(Promise.resolve(dto));

    const expectedTitle = Contact.fromObject(dto).fullName;

    activate(id)
      .then(() => expect(routerConfig.navModel.setTitle).toHaveBeenCalledWith(expectedTitle))
      .then(done);
  });
});
