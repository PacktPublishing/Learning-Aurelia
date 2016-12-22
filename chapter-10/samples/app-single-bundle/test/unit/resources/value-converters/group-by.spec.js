import {GroupByValueConverter} from '../../../../src/resources/value-converters/group-by';

describe('the groupBy value converter', () => {
  
  let sut;

  beforeEach(() => {
    sut = new GroupByValueConverter();
  });

  it('should group values by property', () => {
    const group1 = [
      { g: 1, v: 1 },
      { g: 1, v: 2 },
    ];
    const group2 = [
      { g: 2, v: 3 },
      { g: 2, v: 4 },
      { g: 2, v: 5 },
    ];
    const group3 = [
      { g: 3, v: 6 },
    ];
    const array = group1.concat(group2).concat(group3);

    const result = sut.toView(array, 'g');

    const expectedResult = [
      { key: 1, items: group1 },
      { key: 2, items: group2 },
      { key: 3, items: group3 },
    ];
    expect(result).toEqual(expectedResult);
  });
});
