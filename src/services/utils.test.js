import { convertDataFromWattsToKwh, formatTooltip } from './utils';

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

describe('formatTooltip', () => {
  it('should format numeric value correctly', () => {
    const value = 123.45;
    const expected = ['123,45 kWh', null];
    expect(formatTooltip(value)).toEqual(expected);
  });

  it('should handle non-numeric value', () => {
    const value = 'abc';
    const expected = [null, null];
    expect(formatTooltip(value)).toEqual(expected);
  });

  it('should handle zero value', () => {
    const value = 0;
    const expected = [null, null];
    expect(formatTooltip(value)).toEqual(expected);
  });

  it('should handle string representation of a numeric value', () => {
    const value = '123.45';
    const expected = ['123,45 kWh', null];
    expect(formatTooltip(value)).toEqual(expected);
  });

  it('should handle negative numeric value', () => {
    const value = -123.45;
    const expected = ['-123,45 kWh', null];
    expect(formatTooltip(value)).toEqual(expected);
  });
});