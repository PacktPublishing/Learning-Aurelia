import {ValidationError} from 'aurelia-validation';
import {ContactCreation} from '../../../../src/contacts/components/creation';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contact creation component', () => {

  let gateway, validationController, router, events, form, sut;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['create']);
    validationController = jasmine.createSpyObj('ValidationController', ['validate']);
    router = jasmine.createSpyObj('Router', ['navigateToRoute']);
    events = jasmine.createSpyObj('EventAggregator', ['subscribe']);
    form = jasmine.createSpyObj('form', ['emphasizeErrors']);
    sut = new ContactCreation(gateway, validationController, router, events);
    sut.form = form;
  });

  function createValidationError() {
    return new ValidationError({}, 'Invalid', sut.contact, 'firstName');
  }


  it('should do nothing when contact is invalid', done => {
    const errors = [createValidationError()];
    validationController.validate.and.returnValue(Promise.resolve(errors));

    sut.save()
      .then(() => expect(gateway.create).not.toHaveBeenCalled())
      .then(() => expect(router.navigateToRoute).not.toHaveBeenCalled())
      .then(done);
  });

  it('should create and navigate when contact is valid', done => {
    validationController.validate.and.returnValue(Promise.resolve([]));
    gateway.create.and.returnValue(Promise.resolve());

    sut.save()
      .then(() => expect(gateway.create).toHaveBeenCalledWith(sut.contact))
      .then(() => expect(router.navigateToRoute).toHaveBeenCalledWith('contacts'))
      .then(done);
  });
});
