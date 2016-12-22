import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

describe('the submit-button custom element', () => {
  
  let component, form, sut, icon, spinner;

  beforeEach(() => {
    component = StageComponent
      .withResources('resources/elements/submit-button.html')
      .inView('<form><submit-button></submit-button></form>')
      .boundTo({});
  });

  function create() {
    return component.create(bootstrap).then(() => {
      form = document.querySelector('form');
      sut = document.querySelector('submit-button');
      icon = sut.querySelector('i.fa-check-circle-o');
      spinner = sut.querySelector('i.fa-spinner');
    });
  }

  function isVisible(element) {
    const style = window.getComputedStyle(element);
    const isVisibleItself = style.display !== 'none';
    return isVisibleItself && (!element.parentElement || isVisible(element.parentElement));
  }

  function setFormSubmittingIndicator(value) {
    form.isSubmitTaskExecuting = value;
    return new Promise(setTimeout);
  }

  afterEach(() => {
    component.dispose();
  });

  it('should display icon when form has no submit indicator', done => {
    create()
      .then(() => expect(isVisible(icon)).toBe(true))
      .then(done);
  });

  it('should hide spinner when form has no submit indicator', done => {
    create()
      .then(() => expect(isVisible(spinner)).toBe(false))
      .then(done);
  });

  it('should display icon when form submit indicator is false', done => {
    create()
      .then(() => setFormSubmittingIndicator(false))
      .then(() => expect(isVisible(icon)).toBe(true))
      .then(done);
  });

  it('should hide spinner when form submit indicator is false', done => {
    create()
      .then(() => setFormSubmittingIndicator(false))
      .then(() => expect(isVisible(spinner)).toBe(false))
      .then(done);
  });

  it('should hide icon when form submit indicator is true', done => {
    create()
      .then(() => setFormSubmittingIndicator(true))
      .then(() => expect(isVisible(icon)).toBe(false))
      .then(done);
  });

  it('should show spinner when form submit indicator is true', done => {
    create()
      .then(() => setFormSubmittingIndicator(true))
      .then(() => expect(isVisible(spinner)).toBe(true))
      .then(done);
  });
});
