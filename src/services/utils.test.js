import { convertDataFromWattsToKwh } from './utils';

describe('convertDataFromWattsToKwh', () => {
  it('should convert data from watts to kWh', () => {
    const testData = [
      { value: '500', otherProp: 'otherValue1' },
      { value: '750', otherProp: 'otherValue2' },
    ];
    const expectedOutput = [
      { value: 0.5, otherProp: 'otherValue1' },
      { value: 0.75, otherProp: 'otherValue2' },
    ];

    const result = convertDataFromWattsToKwh(testData);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input data', () => {
    const result = convertDataFromWattsToKwh([]);

    expect(result).toEqual([]);
  });

  it('should handle data with non-numeric value properties', () => {
    const testData = [{ value: 'abc', otherProp: 'otherValue' }];

    const result = convertDataFromWattsToKwh(testData);

    expect(result).toEqual(testData);
  });
});
