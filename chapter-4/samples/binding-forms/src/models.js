export class Culture {
  constructor(name, isoCode) {
    this.name = name;
    this.isoCode = isoCode;
  }
}

export const countries = [
  'Canada', 
  'France', 
  'USA'
];
export const cultures = [
  new Culture('English (Canada)', 'en-CA'),
  new Culture('French (Canada)', 'fr-CA'),
  new Culture('French (France)', 'fr-FR'),
  new Culture('English (US)', 'en-US'),
];
