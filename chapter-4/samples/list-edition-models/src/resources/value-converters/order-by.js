export class OrderByValueConverter {
  toView(array, property, direction = 'asc') {
    array = array.slice(0);
    const directionFactor = direction === 'desc' ? -1 : 1;
    array.sort((item1, item2) => {
      const value1 = item1[property];
      const value2 = item2[property];
      if (value1 > value2) {
        return directionFactor;
      } else if (value1 < value2) {
        return -directionFactor;
      } else {
        return 0;
      }
    });
    return array;
  }
}
