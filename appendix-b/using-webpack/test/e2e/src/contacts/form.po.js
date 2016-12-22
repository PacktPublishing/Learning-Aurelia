class ListEditorPO {

  constructor(property) {
    this.property = property;
  }

  _getContainer() {
    return element(by.css(`list-editor[items\\.bind=contact\\.${this.property}]`));
  }

  _getItem(index) {
    return this._getContainer()
      .all(by.css(`.le-item`))
      .get(index);
  }

  _selectOption(index, name, value) {
    this._getItem(index)
      .element(by.valueBind(`${name} & validate`))
      .element(by.css(`option[value=${value}]`))
      .click();
    return browser.sleep(200);
  }

  _setText(index, name, value) {
    this._getItem(index)
      .element(by.valueBind(`${name} & validate`))
      .clear()
      .sendKeys(value);
    return browser.sleep(200);
  }

  clickRemove(index) {
    this._getItem(index)
      .element(by.css(`.le-remove-btn`))
      .click();
    return browser.sleep(200);
  }

  clickAdd() {
    this._getContainer()
      .element(by.css(`.le-add-btn`))
      .click();
    return browser.sleep(200);
  }
}

class PhoneNumberListEditorPO extends ListEditorPO {

  constructor() {
    super('phoneNumbers');
  }

  setType(index, value) {
    return this._selectOption(index, 'type', value);
  }

  setNumber(index, value) {
    return this._setText(index, 'number', value);
  }
}

class EmailAddressListEditorPO extends ListEditorPO {

  constructor() {
    super('emailAddresses');
  }

  setType(index, value) {
    return this._selectOption(index, 'type', value);
  }

  setAddress(index, value) {
    return this._setText(index, 'address', value);
  }
}

class AddressListEditorPO extends ListEditorPO {

  constructor() {
    super('addresses');
  }

  setType(index, value) {
    return this._selectOption(index, 'type', value);
  }

  setNumber(index, value) {
    return this._setText(index, 'number', value);
  }

  setStreet(index, value) {
    return this._setText(index, 'street', value);
  }

  setPostalCode(index, value) {
    return this._setText(index, 'postalCode', value);
  }

  setState(index, value) {
    return this._setText(index, 'state', value);
  }

  setCountry(index, value) {
    return this._setText(index, 'country', value);
  }
}

class SocialProfileListEditorPO extends ListEditorPO {

  constructor() {
    super('socialProfiles');
  }

  setType(index, value) {
    return this._selectOption(index, 'type', value);
  }

  setUsername(index, value) {
    return this._setText(index, 'username', value);
  }
}

export class ContactFormPO {

  constructor() {
    this.phoneNumbers = new PhoneNumberListEditorPO();
    this.emailAddresses = new EmailAddressListEditorPO();
    this.addresses = new AddressListEditorPO();
    this.socialProfiles = new SocialProfileListEditorPO();
  }

  _setText(name, value) {
    element(by.valueBind(`contact.${name} & validate`))
      .clear()
      .sendKeys(value);
    return browser.sleep(200);
  }

  setFirstName(value) {
    return this._setText('firstName', value);
  }

  setLastName(value) {
    return this._setText('lastName', value);
  }

  setCompany(value) {
    return this._setText('company', value);
  }

  setBirthday(value) {
    element(by.css('bs-datepicker[date\\.bind="contact.birthday & validate"]'))
      .element(by.css('input'))
      .clear()
      .sendKeys(value);
    return browser.sleep(200);
  }

  setNote(value) {
    return this._setText('note', value);
  }

  getValidationErrors() {
    return element.all(by.css('.validation-message'))
      .map(x => x.getText());
  }
}
