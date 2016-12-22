export class FilterByValueConverter {
  toView(array, value, ...properties) {
    value = (value || '').trim().toLowerCase();
    
    if (!value) {
      return array;
    }
    return array.filter(item => 
      properties.some(property => 
        (item[property] || '').toLowerCase().includes(value)));
  }
}
