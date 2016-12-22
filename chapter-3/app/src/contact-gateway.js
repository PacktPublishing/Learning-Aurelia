import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Contact} from './models';
import environment from './environment';

@inject(HttpClient)
export class ContactGateway {

  constructor(httpClient) {
    this.httpClient = httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(environment.contactsUrl);
    });
  }

  getAll() {
    return this.httpClient.fetch('contacts')
      .then(response => response.json())
      .then(dto => dto.map(Contact.fromObject));
  }

  getById(id) {
    return this.httpClient.fetch(`contacts/${id}`)
      .then(response => response.json())
      .then(Contact.fromObject);
  }
}
