import {inject, bindable} from 'aurelia-framework';
import {Geocoder} from '../services/geocoder';

@inject(Geocoder)
export class AddressMapCustomElement {

  @bindable address;

  isAttached = false;
  isMapVisible = false;
  isGeocoded = false;
  latitude;
  longitude;

  constructor(geocoder) {
    this.geocoder = geocoder;
  }

  addressChanged() {
    if (this.isAttached) {
      this.geocode();
    }
  }

  attached() {
    this.isAttached = true;
    this.geocode();
  }

  detached() {
    this.isAttached = false;
  }

  geocode() {
    if (this.address) {
      this.geocoder.search(this.address).then(position => {
        if (position) {
          this.latitude = position.latitude;
          this.longitude = position.longitude;
          this.isGeocoded = true;
        } else {
          this.isMapVisible = false;
          this.isGeocoded = false;
          this.latitude = null;
          this.longitude = null;
        }
      });
    }
  }
}
