
import { getPeriod, MARKET_HOLIDAYS } from './timecurves'
/*
- getPeriod - Getting a period
    - LowPower - when the tariff is 2.0
        - labour day peak  - and a labour day is peak -> returns 'PICK'
        - labour day flat  - and a labour day is flat -> returns 'FLAT'
        - labour day valley
        - weekend -> valley
        - bank holiday -> valley
    - HighPower: - when the tariff is 3.0 or greater
        - IbericPeninsula: - and location is Peninsula
            - same cases than 2.0 but using Pn as period names for one season 
            - 9:30 -> peak (s'avança el peak matiner)
            - when the season changes the Pn is different
        - BalearicIslands:
            - Pn changes
        - CanaryIslands: Pn changes

*/

describe('getPeriod: Obtaining the period to apply at a given time', () => {
    const labour_07_30 = new Date('2023-12-15 07:30:00')
    const labour_08_30 = new Date('2023-12-15 08:30:00')
    const labour_09_30 = new Date('2023-12-15 09:30:00')
    const labour_11_30 = new Date('2023-12-15 11:30:00')
    const labour_14_30 = new Date('2023-12-15 14:30:00')
    const labour_15_30 = new Date('2023-12-15 15:30:00')
    const labour_18_30 = new Date('2023-12-15 18:30:00')
    const labour_22_30 = new Date('2023-12-15 22:30:00')
    const weekend_11_30 = new Date('2023-12-16 11:30:00')
    const holiday_11_30 = new Date('2023-12-25 11:30:00')
    const labour_08_30_july = new Date('2023-07-11 08:30:00')
    MARKET_HOLIDAYS.push('2023-12-25')

    describe('Given a low power tariff', () => {
        test('Labour day before 8:00 should return valley', () => {
            expect(getPeriod(labour_07_30)).toBe('VALLEY')
        })
        test('Labour day before 10:00 should return flat', () => {
            expect(getPeriod(labour_08_30)).toBe('FLAT')
            expect(getPeriod(labour_09_30)).toBe('FLAT')
        })
        test('Labour day before 14:00 should return peak', () => {
            expect(getPeriod(labour_11_30)).toBe('PICK')
        })
        test('Labour day before 18:00 should return flat', () => {
            expect(getPeriod(labour_14_30)).toBe('FLAT')
            expect(getPeriod(labour_15_30)).toBe('FLAT')
        })
        test('Labour day before 22:00 should return peak', () => {
            expect(getPeriod(labour_18_30)).toBe('PICK')
        })
        test('Labour day after 22:00 should return flat', () => {
            expect(getPeriod(labour_22_30)).toBe('FLAT')
        })
        test('Weekend day any time should return valley', () => {
            expect(getPeriod(weekend_11_30)).toBe('VALLEY')
        })
        test('Holiday day any time should return valley', () => {
            expect(getPeriod(holiday_11_30)).toBe('VALLEY')
        })
    })
    describe('Given a highpower tariff in the peninsula', () => {
        test('Labour day before 8:00 should return valley', () => {
            expect(getPeriod(labour_07_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P6')
        })
        test('Labour day before 10:00 should return flat', () => {
            expect(getPeriod(labour_08_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P2')
        })
        test('Labour day before 14:00 should return peak', () => {
            expect(getPeriod(labour_09_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P1')
            expect(getPeriod(labour_11_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P1')
        })
        test('Labour day before 18:00 should return flat', () => {
            expect(getPeriod(labour_14_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P2')
            expect(getPeriod(labour_15_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P2')
        })
        test('Labour day before 22:00 should return peak', () => {
            expect(getPeriod(labour_18_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P1')
        })
        test('Labour day after 22:00 should return flat', () => {
            expect(getPeriod(labour_22_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P2')
        })
        test('Weekend day any time should return valley', () => {
            expect(getPeriod(weekend_11_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P6')
        })
        test('Holiday day any time should return valley', () => {
            expect(getPeriod(holiday_11_30, 'Taula_Peatges_30_60_Peninsular')).toBe('P6')
        })
    })
    describe('Given a highpower tariff in the Balearic Islands', () => {
        test('Labour day before 8:00 should return valley', () => {
            expect(getPeriod(labour_07_30, 'Taula_Peatges_30_60_Balears')).toBe('P6')
        })
        test('Labour day before 10:00 should return flat', () => {
            expect(getPeriod(labour_08_30, 'Taula_Peatges_30_60_Balears')).toBe('P4')
            expect(getPeriod(labour_09_30, 'Taula_Peatges_30_60_Balears')).toBe('P4')
        })
        test('Labour day before 15:00 should return peak', () => {
            expect(getPeriod(labour_11_30, 'Taula_Peatges_30_60_Balears')).toBe('P3')
            expect(getPeriod(labour_14_30, 'Taula_Peatges_30_60_Balears')).toBe('P3')
        })
        test('Labour day before 18:00 should return flat', () => {
            expect(getPeriod(labour_15_30, 'Taula_Peatges_30_60_Balears')).toBe('P4')
        })
        test('Labour day before 22:00 should return peak', () => {
            expect(getPeriod(labour_18_30, 'Taula_Peatges_30_60_Balears')).toBe('P3')
        })
        test('Labour day after 22:00 should return flat', () => {
            expect(getPeriod(labour_22_30, 'Taula_Peatges_30_60_Balears')).toBe('P4')
        })
        test('Weekend day any time should return valley', () => {
            expect(getPeriod(weekend_11_30, 'Taula_Peatges_30_60_Balears')).toBe('P6')
        })
        test('Holiday day any time should return valley', () => {
            expect(getPeriod(holiday_11_30, 'Taula_Peatges_30_60_Balears')).toBe('P6')
        })
    })

    describe('Given a highpower tariff in the Canary Islands', () => {
        test('Labour day before 8:00 should return valley', () => {
            expect(getPeriod(labour_07_30, 'Taula_Peatges_30_60_Canaries')).toBe('P6')
        })
        test('Labour day before 10:00 should return flat', () => {
            expect(getPeriod(labour_08_30, 'Taula_Peatges_30_60_Canaries')).toBe('P3')
            expect(getPeriod(labour_09_30, 'Taula_Peatges_30_60_Canaries')).toBe('P3')
        })
        test('Labour day before 15:00 should return peak', () => {
            expect(getPeriod(labour_11_30, 'Taula_Peatges_30_60_Canaries')).toBe('P2')
            expect(getPeriod(labour_14_30, 'Taula_Peatges_30_60_Canaries')).toBe('P2')
        })
        test('Labour day before 18:00 should return flat', () => {
            expect(getPeriod(labour_15_30, 'Taula_Peatges_30_60_Canaries')).toBe('P3')
        })
        test('Labour day before 22:00 should return peak', () => {
            expect(getPeriod(labour_18_30, 'Taula_Peatges_30_60_Canaries')).toBe('P2')
        })
        test('Labour day after 22:00 should return flat', () => {
            expect(getPeriod(labour_22_30, 'Taula_Peatges_30_60_Canaries')).toBe('P3')
        })
        test('Weekend day any time should return valley', () => {
            expect(getPeriod(weekend_11_30, 'Taula_Peatges_30_60_Canaries')).toBe('P6')
        })
        test('Holiday day any time should return valley', () => {
            expect(getPeriod(holiday_11_30, 'Taula_Peatges_30_60_Canaries')).toBe('P6')
        })
    })
    describe('Given a high power tariff month changes season', () => {
        test('Labour day before 8:00 should return valley', () => {
            expect(getPeriod(labour_08_30_july, 'Taula_Peatges_20')).toBe('FLAT')
            expect(getPeriod(labour_08_30_july, 'Taula_Peatges_30_60_Peninsular')).toBe('P2')
            expect(getPeriod(labour_08_30_july, 'Taula_Peatges_30_60_Canaries')).toBe('P3')
            expect(getPeriod(labour_08_30_july, 'Taula_Peatges_30_60_Balears')).toBe('P2')
        })
    })
    
})
