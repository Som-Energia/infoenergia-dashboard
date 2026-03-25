# InfoEnergia Dashboard

InfoEnergia react dashboard for Som Energia Virtual Office.

## Development setup

<!-- prettier-ignore -->

- Create softlink a it-docs/conf/infoenergia-dashboard/.env.development (`ln -s ../it-docs/conf/infoenergia-dashboard/.env.development .env.development`)
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

## Deployment

To deploy we have to use deploy.sh
```
scripts/deploy.sh [env]
```

### Testing

If you want to deploy to the OV:
```
scripts/deploy.sh ovtest [vassal number]
```
This command uses deploy-ovtest.conf. It is now defined with the test OV configuration.

### Production

If you want to deploy to the OV:
```
scripts/deploy.sh ovprod
```
This command uses deploy-ovprod.conf. It is now defined with the production OV configuration.

### Local

For the first time you should create the folder builds at the root of the projects.

If you want to deploy local:
```
scripts/deploy-local.sh 
```
This command uses deploy-ovlocal.conf. It is now defined with the local OV configuration.

Thing to keep in mind:
- Follow the setup to create the necessary directories
- This script must be run from its directory

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
