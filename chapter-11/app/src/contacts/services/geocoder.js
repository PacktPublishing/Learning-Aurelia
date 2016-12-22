import {HttpClient} from 'aurelia-fetch-client';

export class Geocoder {

  http = new HttpClient().configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('http://nominatim.openstreetmap.org/');
  });

  search(address) {
    const query = {
      format: 'json',
      street: `${address.number} ${address.street}`,
      city: address.city,
      state: address.state,
      country: address.country,
      postalcode: address.postalCode,
      limit: 1,
    };
    return this.http.fetch(`search?${toQueryString(query)}`)
      .then(response => response.json())
      .then(dto => dto.length === 0 ? null : dtoToResult(dto[0]));
  }
}

function toQueryString(query) {
  return Object.getOwnPropertyNames(query)
    .map(name => {
      const key = encodeURIComponent(name);
      const value = encodeURIComponent(query[name]);
      return `${key}=${value}`;
    })
    .join('&');
}

function dtoToResult(dto) {
  return {
    latitude: parseFloat(dto.lat),
    longitude: parseFloat(dto.lon)
  };
}
