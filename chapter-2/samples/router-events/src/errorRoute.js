export class ErrorRoute {
  activate() {
    throw new Error('An error occured during activation');
  }
}
