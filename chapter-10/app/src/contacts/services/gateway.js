import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Contact} from '../models/contact';

@inject(HttpClient)
export class ContactGateway {

  constructor(httpClient) {
    this.httpClient = httpClient;
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
