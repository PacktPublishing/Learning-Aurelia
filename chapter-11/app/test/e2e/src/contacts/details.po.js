export class ContactDetailsPO {
  
  getFullName() {
    return element(by.tagName('h1')).getText();
  }
}
