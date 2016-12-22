import {ContactFormPO} from './form.po.js';

export class ContactCreationPO extends ContactFormPO {

  getTitle() {
    return element(by.tagName('h1'))
      .getText();
  }

  clickSave() {
    element(by.buttonText('Save'))
      .click();
    return browser.sleep(200);
  }

  clickCancel() {
    element(by.linkText('Cancel'))
      .click();
    return browser.sleep(200);
  }
}
