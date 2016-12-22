import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from 'environment';

@inject(HttpClient)
export class ContactGateway {

  constructor(httpClient) {
    this.httpClient = httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(environment.contactsUrl);
    });
  }

  create(contact) {
    return this.httpClient.fetch('contacts', { method: 'POST', body: json(contact) });
  }

  update(id, contact) {
    return this.httpClient.fetch(`contacts/${id}`, { method: 'PUT', body: json(contact) });
  }

  updatePhoto(id, file) {
    return this.httpClient.fetch(`contacts/${id}/photo`, { 
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });
  }

  delete(id) {
    return this.httpClient.fetch(`contacts/${id}`, { method: 'DELETE' });
  }
}
