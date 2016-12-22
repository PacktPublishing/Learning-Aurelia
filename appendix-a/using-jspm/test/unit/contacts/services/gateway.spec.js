import {json} from 'aurelia-fetch-client';
import {ContactGateway} from '../../../../src/contacts/services/gateway';

describe('the ContactGateway class', () => {
  
  let httpClient, sut;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['fetch']);
    sut = new ContactGateway(httpClient);
  });

  function createContactDto() {
    return { id: 1, company: 'Blue Spire' };
  }

  function createJsonResponseMock(content) {
    return { json: () => Promise.resolve(content) };
  }

  function readBlob(blob) {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.addEventListener("loadend", () => { resolve(reader.result); });
      reader.readAsText(blob);
    });
  }

  function expectBlobsToBeEqual(result, expected) {
    expect(result.type).toEqual(expected.type);
    expect(result.size).toEqual(expected.size);

    return Promise
      .all([ readBlob(result), readBlob(expected) ])
      .then(([c1, c2]) => expect(c1).toEqual(c2));
  }

  function expectFetchToHaveBeenCalled(expectedPath, expectedProperties) {
    let expectedBody;
    if (expectedProperties.body) {
      expectedBody = expectedProperties.body;
      delete expectedProperties.body;
    }

    expect(httpClient.fetch).toHaveBeenCalledWith(expectedPath, jasmine.objectContaining(expectedProperties));
    if (expectedBody) {
      return expectBlobsToBeEqual(httpClient.fetch.calls.mostRecent().args[1].body, expectedBody);
    }
  }


  it('should fetch all contacts', done => {
    const contacts = [createContactDto()];
    httpClient.fetch.and.returnValue(Promise.resolve(createJsonResponseMock(contacts)));

    sut.getAll()
      .then(result => expect(result).toEqual(contacts))
      .then(() => expect(httpClient.fetch).toHaveBeenCalledWith('contacts'))
      .then(done);
  });

  it('should fetch a contact by its id', done => {
    const contact = createContactDto();
    httpClient.fetch.and.returnValue(Promise.resolve(createJsonResponseMock(contact)));

    sut.getById(contact.id)
      .then(result => expect(result).toEqual(contact))
      .then(() => expect(httpClient.fetch).toHaveBeenCalledWith(`contacts/${contact.id}`))
      .then(done);
  });

  it('should create a contact', done => {
    const contact = createContactDto();
    httpClient.fetch.and.returnValue(Promise.resolve());

    sut.create(contact)
      .then(() => expectFetchToHaveBeenCalled('contacts', { method: 'POST', body: json(contact) }))
      .then(done);
  });

  it('should update a contact', done => {
    const contact = createContactDto();
    httpClient.fetch.and.returnValue(Promise.resolve());

    sut.update(contact.id, contact)
      .then(() => expectFetchToHaveBeenCalled(`contacts/${contact.id}`, { method: 'PUT', body: json(contact) }))
      .then(done);
  });

  it("should update a contact's photo", done => {
    const id = 9;
    const contentType = 'image/png';
    const file = new File(['some binary content'], 'img.png', { type: contentType });
    httpClient.fetch.and.returnValue(Promise.resolve());

    const expectedRequestProperties = {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: file
    };
    sut.updatePhoto(id, file)
      .then(() => expectFetchToHaveBeenCalled(`contacts/${id}/photo`, expectedRequestProperties))
      .then(done);
  });
});
