import {ValidationError} from 'aurelia-validation';
import {ContactPhoto} from '../../../../src/contacts/components/photo';
import {Contact} from '../../../../src/contacts/models/contact';

describe('the contact photo component', () => {

  let gateway, validationController, router, sut, routerConfig;

  beforeEach(() => {
    gateway = jasmine.createSpyObj('ContactGateway', ['getById', 'updatePhoto']);
    validationController = jasmine.createSpyObj('ValidationController', ['validate']);
    router = jasmine.createSpyObj('Router', ['navigateToRoute']);
    sut = new ContactPhoto(gateway, router, validationController);

    routerConfig = {
      navModel: jasmine.createSpyObj('routerConfig.navModel', ['setTitle'])
    };
  });
  
  function activate(id) {
    return sut.activate({ id }, routerConfig);
  }

  function createValidationError() {
    return new ValidationError({}, 'Invalid', sut, 'photo');
  }

  function createFile() {
    return new File(['some binary content'], 'test.png', { type: 'image/png' });
  }

  function createFileListMock(...files) {
    const clone = files.slice();
    return {
      item: index => clone[index],
      length: clone.length
    };
  }


  it('should load and map contact when activated', done => {
    const id = 12;
    const contact = Contact.fromObject({ id, firstName: 'Some name' });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    activate(id)
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

  it('should show no preview when no photo is selected', done => {
    const id = 23;
    const contact = Contact.fromObject({ id });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    activate(id)
      .then(() => { sut.photo = null; })
      .then(() => expect(sut.preview).toBe(null))
      .then(done);
  });

  it('should show no preview when photo is invalid', done => {
    const id = 23;
    const contact = Contact.fromObject({ id });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    activate(id)
      .then(() => { sut.photoErrors = [createValidationError()]; })
      .then(() => expect(sut.preview).toBe(null))
      .then(done);
  });

  it('should show preview when photo is selected and valid', done => {
    const id = 23;
    const contact = Contact.fromObject({ id });
    gateway.getById.and.returnValue(Promise.resolve(contact));

    const imgFile = createFile();

    activate(id)
      .then(() => { sut.photo = createFileListMock(imgFile); })
      .then(() => expect(sut.preview).toBe(imgFile))
      .then(done);
  });

  it('should not save when photo is invalid', done => {
    const id = 34;
    const contact = Contact.fromObject({ id });
    gateway.getById.and.returnValue(Promise.resolve(contact));
    validationController.validate.and.returnValue(Promise.resolve([createValidationError()]));

    activate(id)
      .then(() => sut.save())
      .then(() => expect(gateway.updatePhoto).not.toHaveBeenCalled())
      .then(() => expect(router.navigateToRoute).not.toHaveBeenCalled())
      .then(done);
  });

  it('should update photo and navigate when contact is valid', done => {
    const id = 45;
    const contact = Contact.fromObject({ id });
    gateway.getById.and.returnValue(Promise.resolve(contact));
    validationController.validate.and.returnValue(Promise.resolve([]));
    gateway.updatePhoto.and.returnValue(Promise.resolve());

    const imgFile = createFile();

    activate(id)
      .then(() => { sut.photo = createFileListMock(imgFile); })
      .then(() => sut.save())
      .then(() => expect(gateway.updatePhoto).toHaveBeenCalledWith(id, imgFile))
      .then(() => expect(router.navigateToRoute).toHaveBeenCalledWith('contact-details', { id }))
      .then(done);
  });
});
