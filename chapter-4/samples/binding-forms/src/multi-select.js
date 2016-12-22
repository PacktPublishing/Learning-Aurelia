import {countries, cultures} from './models';

export class SelectElement {
  constructor() {
    this.countries = countries;
    this.cultures = cultures;

    this.selectedCountries = [countries[0]];
    this.selectedCultures = [cultures[1]];
    this.selectedCulturesIsoCodes = [cultures[1].isoCode];
  }
}
