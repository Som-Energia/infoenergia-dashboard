# InfoEnergia Dashboard

InfoEnergia react dashboard for Som Energia Virtual Office.

## Development setup

<!-- prettier-ignore -->
- Copy .env.development.example as .env.development
- Fill the contract list and the token
- Trick: if you connect to the real OV infoenergia page as any user, and you inspect the code, the html contains both.
- Run `npm start` to launch the application. The landing page has an index to the target urls

To run the tests

```bash
npm run test
```

## Deploy into oficina virtual

This command will build and copy the files to oficinavirtual.
In order to work both repositories (`infoenergia-dashboard` and `oficinavirtual`)
should be cloned at the same directory level and with their default names.

```bash
npm run build:ov
```

## Component tree

### Energy Curves

<!-- prettier-ignore -->
- App
    - TimeCurvePageWrapper
        - Container/ContractSelectorWrapper: Selects contract and provide its data
            - TimeCurvesContextProvider: Download curves and provide them
                - TimeCurvesPage:
                    - TimeCurves:
                        - TimeCurvesBarChart
                        - TimeCurvesLineChart
