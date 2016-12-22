import {FilterByValueConverter} from '../../../../src/resources/value-converters/filter-by';

describe('the filterBy value converter', () => {

  let sut;

  beforeEach(() => {
    sut = new FilterByValueConverter();
  });

  it('should keep value when any searched property contains searched value', () => {
    const array = [
      { p1: 'abc' },
      { p2: 'bcd' },
    ];

    const result = sut.toView(array, 'bc', 'p1', 'p2');

    expect(result).toEqual(array);
  });

  it('should discard value when no search property contains searched value', () => {
    const matchingArray = [
      { p1: 'abc' },
    ]
    const nonMatchingArray = [
      { p2: 'xyz', excluded: 'abc' },
    ];
    const array = matchingArray.concat(nonMatchingArray);

    const result = sut.toView(array, 'bc', 'p1', 'p2');

    expect(result).toEqual(matchingArray);
  });
});
