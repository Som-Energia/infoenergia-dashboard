import { convertDataFromWattsToKwh, formatTooltip, getDataForTable } from './utils';
import { consumption } from '../containers/Generation/mockData/AssignmentsConsumption'

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
    expect(formatTooltip(value, 'kWh')).toEqual(expected);
  });

  it('should display maximum 3 decimal points', () => {
    const value = 123.4567890;
    const expected = ['123,457 kWh', null];
    expect(formatTooltip(value, 'kWh', 3)).toEqual(expected);
  });

  it('should handle non-numeric value', () => {
    const value = 'abc';
    const expected = ['-- kWh', null];
    expect(formatTooltip(value, 'kWh')).toEqual(expected);
  });

  it('should handle zero value', () => {
    const value = 0;
    const expected = ['0 kWh', null];
    expect(formatTooltip(value, 'kWh')).toEqual(expected);
  });

  it('should handle string representation of a numeric value', () => {
    const value = '123.45';
    const expected = ['123,45 kWh', null];
    expect(formatTooltip(value, 'kWh')).toEqual(expected);
  });

  it('should handle negative numeric value', () => {
    const value = -123.45;
    const expected = ['-123,45 kWh', null];
    expect(formatTooltip(value, 'kWh')).toEqual(expected);
  });

  it('should formatted assignments for table', () => {
    const useData =
    {
      "0004438": {
        "P2": 234,
        "P3": 254,
        "P1": 282,
        "address": "Carrer Frederic Casals"
      },
      "0013117": {
        "P2": 4,
        "P3": 0,
        "P1": 3,
        "address": "Carrer Jacint Verdaguer"
      },
      "0231286": {
        "P2": 0,
        "P3": 0,
        "P1": 0,
        "address": "Carrer Doctor Martí Julià"
      }
    }

    const assignments = [
      { id: 7859, contract: "ES0031408064564001YH0F - 0004438", contract_address: "Carrer Frederic Casals", contract_tariff: "2.0TD", priority: 0, contract_last_invoiced: "\"2023-10-31\"", annual_use_kwh: "3261.0" },
      { id: 7858, contract: "ES0031405524910014WM0F - 0013117", contract_address: "Carrer Jacint Verdaguer", contract_tariff: "2.0TD", priority: 1, contract_last_invoiced: "\"2023-11-03\"", annual_use_kwh: "97.0" }
    ]



    const expected = {
      "data": {
        "dataKeys": [
          "P3",
          "P2",
          "P1",
        ],
        "rows": [
          {
            "P1": "282 kWh",
            "P2": "234 kWh",
            "P3": "254 kWh",
            "id": " 0004438 - Carrer Frederic Casals",
            "priority": 0,
            "total": "770 kWh",
          },
          {
            "P1": "3 kWh",
            "P2": "4 kWh",
            "P3": "0 kWh",
            "id": " 0013117 - Carrer Jacint Verdaguer",
            "priority": 1,
            "total": "7 kWh",
          },
          {
            "P1": "0 kWh",
            "P2": "0 kWh",
            "P3": "0 kWh",
            "id": "0231286 - Carrer Doctor Martí Julià",
            "priority": "-",
            "total": "0 kWh",
          },
        ],
        "total": 777,
      },
    }

    expect(getDataForTable(assignments, useData)).toEqual(expected);

  });


});