import {ValidationError} from 'aurelia-validation';
import {ContactEdition} from '../../../../src/contacts/components/edition';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contact edition component', () => {

  let gateway, validationController, router, sut, routerConfig;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['getById', 'update']);
    validationController = jasmine.createSpyObj('ValidationController', ['validate']);
    router = jasmine.createSpyObj('Router', ['navigateToRoute']);
    sut = new ContactEdition(gateway, validationController, router);

    routerConfig = {
      navModel: jasmine.createSpyObj('routerConfig.navModel', ['setTitle'])
    };
  });

  function createValidationError() {
    return new ValidationError({}, 'Invalid', sut.contact, 'firstName');
  }
  
  function activate(id) {
    return sut.activate({ id }, routerConfig);
  }


  it('should load and map contact when activated', done => {
    const id = 12;
    const contact = Contact.fromObject({ id, firstName: 'Some name' });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    activate(id)
      .then(() => expect(gateway.getById).toHaveBeenCalledWith(id))
      .then(() => expect(sut.contact).toEqual(contact))
      .then(done);
  });

  it('should set fullName as document title when activated', done => {
    const id = 23;
    const contact = Contact.fromObject({ id, firstName: 'Some', lastName: 'Name' });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    const expectedTitle = contact.fullName;

    activate(id)
      .then(() => expect(routerConfig.navModel.setTitle).toHaveBeenCalledWith(expectedTitle))
      .then(done);
  });

  it('should do nothing when contact is invalid', done => {
    const id = 34;
    const contact = Contact.fromObject({ id, firstName: 'Some', lastName: 'Name' });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    activate(id)
      .then(() => {
        const errors = [createValidationError()];
        validationController.validate.and.returnValue(Promise.resolve(errors));
      })
      .then(() => sut.save())
      .then(() => expect(gateway.update).not.toHaveBeenCalled())
      .then(() => expect(router.navigateToRoute).not.toHaveBeenCalled())
      .then(done);
  });

  it('should update and navigate when contact is valid', done => {
    const id = 45;
    const contact = Contact.fromObject({ id, firstName: 'Some', lastName: 'Name' });
    gateway.getById.and.returnValue(Promise.resolve(contact));
    validationController.validate.and.returnValue(Promise.resolve([]));
    gateway.update.and.returnValue(Promise.resolve());

    activate()
      .then(() => sut.save())
      .then(() => expect(gateway.update).toHaveBeenCalledWith(id, sut.contact))
      .then(() => expect(router.navigateToRoute).toHaveBeenCalledWith('contact-details', { id }))
      .then(done);
  });
});
