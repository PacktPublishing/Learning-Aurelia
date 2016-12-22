import {OrderByValueConverter} from '../../../../src/resources/value-converters/order-by';

describe('the orderBy value converter', () => {

  let sut;

  beforeEach(() => {
    sut = new OrderByValueConverter();
  });

  it('should sort values using property', () => {
    const array = [ { v: 3 }, { v: 2 }, { v: 4 }, { v: 1 }, ];
    const expectedResult = [ { v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, ];

    const result = sut.toView(array, 'v');

    expect(result).toEqual(expectedResult);
  });

  it('should sort values in reverse order when direction is "desc"', () => {
    const array = [ { v: 3 }, { v: 2 }, { v: 4 }, { v: 1 }, ];
    const expectedResult = [ { v: 4 }, { v: 3 }, { v: 2 }, { v: 1 }, ];

    const result = sut.toView(array, 'v', 'desc');

    expect(result).toEqual(expectedResult);
  });
});
