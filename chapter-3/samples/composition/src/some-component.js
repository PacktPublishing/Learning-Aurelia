export class SomeComponent {
  constructor() {
    this.title = 'A Component';
  }

  activate(data) {
    this.activationData = data || 'none';
  }
}
