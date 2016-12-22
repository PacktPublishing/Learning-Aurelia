import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {configure} from '../../configuration';

class Item {
  constructor(text) {
    this.text = text;
  }

  toString() {
    return this.text;
  }
}

describe('the list-editor custom element', () => {

  let items, createItem, component, element;

  beforeEach(() => {
    items = [];
    createItem = jasmine.createSpy('createItem');
    component = StageComponent
      .withResources('resources/elements/list-editor')
      .inView(`<list-editor items.bind="items" 
                 add-item.call="createItem()"></list-editor>`)
      .boundTo({ items, createItem });
    component.bootstrap(configure);
  });

  function create() {
    return component.create(bootstrap).then(() => {
      element = document.querySelector('list-editor');
    });
  }

  function getItemsViews() {
    return Array.from(element.querySelectorAll('.le-item'));
  }

  function clickRemoveButtonAt(index) {
    const removeBtn = element.querySelectorAll('.le-remove-btn')[index];
    removeBtn.click();
    return new Promise(setTimeout);
  }

  function clickAddButton() {
    const addBtn = element.querySelector('.le-add-btn');
    addBtn.click();
    return new Promise(setTimeout);
  }

  function isItemRendered(item, itemsViews) {
    return (itemsViews || getItemsViews())
      .some(iv => iv.textContent.includes(item.text));
  }

  function areAllItemsRendered() {
    const itemsViews = getItemsViews();
    return items.every(i => isItemRendered(i, itemsViews));
  }

  afterEach(() => {
    component.dispose();
  });


  it('should render one form-group per item', done => {
    items.push(new Item('test item 1'));
    items.push(new Item('test item 2'));

    create()
      .then(() => expect(areAllItemsRendered()).toBe(true))
      .then(done);
  });
  
  it('should remove the item when the remove button is clicked', done => {
    items.push(new Item('test item 1'));
    items.push(new Item('test item 2'));
    items.push(new Item('test item 3'));

    const indexToRemove = 1;
    const itemToRemove = items[indexToRemove];

    create()
      .then(() => clickRemoveButtonAt(indexToRemove))
      .then(() => expect(items.indexOf(itemToRemove)).toBe(-1))
      .then(() => expect(isItemRendered(itemToRemove)).toBe(false))
      .then(done);
  });

  it('should add new item when the add item button is clicked', done => {
    items.push(new Item('test item 1'));
    items.push(new Item('test item 2'));

    const indexOfItemToAdd = items.length;
    const itemToAdd = new Item('test item 3');
    createItem.and.callFake(() => { items.push(itemToAdd); });

    create()
      .then(() => clickAddButton())
      .then(() => expect(items.indexOf(itemToAdd)).toBe(indexOfItemToAdd))
      .then(() => expect(isItemRendered(itemToAdd)).toBe(true))
      .then(done);
  });
});
