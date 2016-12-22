import {bootstrap} from 'aurelia-bootstrapper-webpack';
import {StageComponent} from 'aurelia-testing';
import {DOM} from 'aurelia-pal';

describe('the file-drop-target custom attribute', () => {

  let viewModel, component, element;

  beforeEach(() => {
    viewModel = { files: null };
    component = StageComponent
      .withResources('resources/attributes/file-drop-target')
      .inView('<div file-drop-target.bind="files"></div>')
      .boundTo(viewModel);
  });

  function create() {
    return component.create(bootstrap).then(() => {
      element = document.querySelector('[file-drop-target\\.bind]');
    });
  }

  function createFile() {
    return new File(['some binary content'], 'test.txt', { type: 'text/plain' });
  }

  function createDragEvent(type, dataTransfer) {
    const e = DOM.createCustomEvent(type, { bubbles: true });
    e.dataTransfer = dataTransfer;
    return e;
  }

  function dragOver() {
    element.dispatchEvent(createDragEvent('dragover'));
    return new Promise(setTimeout);
  }

  function drop(dataTransfer) {
    element.dispatchEvent(createDragEvent('drop', dataTransfer));
    return new Promise(setTimeout);
  }

  function dragEnd(dataTransfer) {
    element.dispatchEvent(createDragEvent('dragend', dataTransfer));
    return new Promise(setTimeout);
  }

  afterEach(() => {
    component.dispose();
  });

  it('should assign dropped files to bounded instruction', done => {
    const files = [createFile()];

    create()
      .then(() => dragOver())
      .then(() => drop({ files }))
      .then(() => expect(viewModel.files).toEqual(files))
      .then(done);
  });

  it('should clear data when drag ends', done => {
    const files = [createFile()];
    const clearData = jasmine.createSpy('clearData');

    create()
      .then(() => dragOver())
      .then(() => drop({ files }))
      .then(() => dragEnd({ clearData }))
      .then(() => expect(clearData).toHaveBeenCalled())
      .then(done);
  });
});
