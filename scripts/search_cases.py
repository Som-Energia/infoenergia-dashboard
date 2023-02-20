#!/usr/bin/env python
import click
import configdb;
import erppeek;

ENVIRONMENT = 'prod'
TARIFF = '3.0TD'

@click.command()
@click.argument(
    'tariff',
)
@click.option(
    '--erp','-e','erp_instance',
    type=click.Choice(configdb.erppeek_profiles.keys()),
    default='prod',
    help="ERP instance",
)
def main(tariff, erp_instance):
    erp = erppeek.Client(**configdb.erppeek_profiles.get(erp_instance))

    polissa_model = erp.model('giscedata.polissa')
    polissa_filters = [
            ('tarifa', 'in', [tariff]),
            ('active', '=', 'true'),
            ]
    polissa_matches = polissa_model.search(polissa_filters)
    polissa = polissa_model.read(polissa_matches[10])

    print('{0}\n{1}\n{0}'.format('='*100, polissa['titular']))

    # print('{0}\n{1}\n{0}'.format('='*100, match))
    partner_model = erp.model('res.partner')
    partner = partner_model.read(polissa['titular'][0])
    print(f"{partner['ref']} {polissa['cups'][1]} {partner['empowering_token']}")

if __name__=='__main__':
    main()

