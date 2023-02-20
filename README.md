# InfoEnergia Dashboard

InfoEnergia react dashboard for Som Energia Virtual Office.

## Development setup

- Copy .env.development.example as .env.development
- Fill the contract list and the token
- Trick: if you connect to the real OV infoenergia page as any user, and you inspect the code, the html contains both.
- Run `npm start` to launch the application, a blank page will open, ignore it.
- Reference urls:
    - http://localhost:3000/es/infoenergy/
    - http://localhost:3000/es/infoenergy/energy-use

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
