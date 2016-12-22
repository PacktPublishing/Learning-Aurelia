import {countries, cultures} from './models';

export class SelectElement {
  constructor() {
    this.countries = countries;
    this.cultures = cultures;

    this.selectedCountry = countries[0];
    this.selectedCulture = cultures[1];
    this.selectedCultureIsoCode = cultures[1].isoCode;
  }
}
