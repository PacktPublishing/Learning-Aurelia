import {bootstrap} from 'aurelia-bootstrapper-webpack';
import {StageComponent} from 'aurelia-testing';
import {DOM} from 'aurelia-pal';

describe('the submit-task custom attribute', () => {

  let onSubmit, component, form;

  beforeEach(() => {
    onSubmit = jasmine.createSpy('onSubmit');
    component = StageComponent
      .withResources('resources/attributes/submit-task')
      .inView('<form submit-task.call="onSubmit()"></form>')
      .boundTo({ onSubmit });
  });

  function create() {
    return component.create(bootstrap).then(() => {
      form = document.querySelector('form[submit-task\\.call]');
    });
  }

  function submit() {
    form.dispatchEvent(DOM.createCustomEvent('submit', { bubbles: true }));
    return new Promise(setTimeout);
  }

  afterEach(() => {
    component.dispose();
  });


  it('should initialize indicator to false', done => {
    create()
      .then(() => expect(form.isSubmitTaskExecuting).toBe(false))
      .then(done);
  });

  it('should set indicator to true when submit is called but not resolved', done => {
    onSubmit.and.returnValue(new Promise(() => {}));

    create()
      .then(() => submit())
      .then(() => expect(form.isSubmitTaskExecuting).toBe(true))
      .then(done);
  });

  it('should set indicator to false when submit is resolved', done => {
    onSubmit.and.returnValue(Promise.resolve());

    create()
      .then(() => submit())
      .then(() => expect(form.isSubmitTaskExecuting).toBe(false))
      .then(done);
  });

  it('should set indicator to false when submit is rejected', done => {
    onSubmit.and.returnValue(Promise.reject(new Error()));

    create()
      .then(() => submit())
      .then(() => expect(form.isSubmitTaskExecuting).toBe(false))
      .then(done);
  });
});
