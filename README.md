# InfoEnergia Dashboard

InfoEnergia react dashboard for Som Energia Virtual Office.

## Development setup

<!-- prettier-ignore -->
- Copy .env.development.example as .env.development or generate it (see below)
- Fill the contract list and the token
- Trick: if you connect to the real OV infoenergia page as any user, and you inspect the code, the html contains both.
- Run `npm start` to launch the application. The landing page has an index to the target urls

To run the tests

```bash
npm run test
```

## Generating .env.development files

You can use `scripts/generate_env.py` to generate the `.env.development` file.

The script requires a `configdb.py` file with a dict called `erppeek_profiles`,
each key pointing to a different erppeek configuration (prod, test, stage...).

Example:

```bash
./scripts/generate_env.py bypartner 123456789X > .env.development.123456789X
./scripts/generate_env.py bycontract -t 3.0 > .env.development.tarifa30
./scripts/generate_env.py bycontract -t 3.0 -z canary > .env.development.canary
```

And then link `.env.development` to any of those. For example:

```bash
ln -sf .env.development.canary .env.development
```

**CAUTION:** After changing the `.env.development`,
a restart is required since it is not monitored by autoreload.

Use `generate_env.py --help` for more usage information.

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
