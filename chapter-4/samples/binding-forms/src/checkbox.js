import {countries, cultures} from './models';

export class Checkbox {
  constructor() {
    this.countries = countries;
    this.cultures = cultures;

    this.selectedCountries = [countries[0]];
    this.selectedCultures = [cultures[1]];
    this.selectedCulturesIsoCodes = [cultures[1].isoCode];

    this.speaksFrench = true;
    this.speaksEnglish = true;
    this.speaksGerman = false;
  }
}
