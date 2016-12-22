export class Contact {

  static fromObject(src) {
    return Object.assign(new Contact(), src);
  }

  get isPerson() {
    return this.firstName || this.lastName;
  }

  get fullName() {
    const fullName = this.isPerson ? `${this.firstName} ${this.lastName}` : this.company;
    return fullName || '';
  }

  get firstLetter() {
    const name = this.lastName || this.firstName || this.company;
    return name ? name[0].toUpperCase() : '?';
  }
}
