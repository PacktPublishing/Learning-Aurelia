export class ContactsListPO {

  getTitle() {
    return element(by.tagName('h1')).getText();
  }
  
  getAllContacts() {
    return element.all(by.css('.cl-details-link')).map(link => link.getText());
  }

  clickContactLink(index) {
    const result = {};
    const link = element.all(by.css(`.cl-details-link`)).get(index);
    link.getText().then(fullName => { result.fullName = fullName; });
    link.click();
    return browser.sleep(500).then(() => result);
  }

  clickNewButton() {
    element(by.css('.cl-create-btn')).click();
    browser.waitForRouterComplete();
    return browser.sleep(200);
  }

  clickClearFilter() {
    element(by.css('.cl-clear-filter-btn')).click();
    return browser.sleep(200);
  }

  setFilter(value) {
    element(by.valueBind('filter & debounce')).clear().sendKeys(value);
    return browser.sleep(200);
  }
}
