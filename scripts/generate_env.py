#!/usr/bin/env python
import click
import configdb
import erppeek
import json

"""
Use cases:
- [ ] Search all contract of a client having at least one 3.0TD contract
- [ ] Search all contract of a client having at least one 3.0TD contract in Balearic islands/Canary islands/ Peninsular
- [ ] Search all contract of a client having contracts in different timetables (2.0TD, Balearic, Canary, Peninsular)
"""


def timetable(polissa):
    if polissa["tarifa"][1] == "2.0TD":
        return "LowPower"
    if polissa["cups"][1].startswith("ES003160"):
        return "Canary"
    if "_INSULAR" in polissa["llista_preu"][1]:
        return "Balearic"
    return "Peninsular"


def output_config(erp, partner):
    polissa_model = erp.model("giscedata.polissa")
    polissa_filters = [
        ("titular", "=", partner["id"]),
    ]
    polissa_ids = polissa_model.search(polissa_filters)
    polisses = polissa_model.read(polissa_ids)
    data = [
        dict(
            name=polissa["name"],
            timetable=timetable(polissa),
            cups=polissa["cups"][1],
            tariff=polissa["tarifa"][1],
            address=polissa["cups_direccio"],
        )
        for polissa in polisses
    ]

    print(f"# Client: {partner['vat'].lstrip('ES')} - {partner['name']}")
    print(f"REACT_APP_DEVEL_TOKEN={partner['empowering_token']}")
    print(f"REACT_APP_DEVEL_CONTRACTS='{json.dumps(data)}'")
    print(f"# testing")
    print(f"#REACT_APP_HEMAN_API_URL='https://heman-test.somenergia.coop/api'")
    print(f"# prod")
    print(f"REACT_APP_HEMAN_API_URL='https://infoenergia-api.somenergia.coop/api'")
    print(f"REACT_APP_WEBFORMS_API_URL='https://api.somenergia.coop'")


def search_partner_by_contract_traits(
    erp,
    tariff,
    zone,
):
    polissa_model = erp.model("giscedata.polissa")
    polissa_filters = [
        ("tarifa", "in", [tariff]),
        ("active", "=", "true"),
    ]
    zone_conditions = dict(
        peninsular=[
            ("llista_preu", "not ilike", "_INSULAR"),
            ("cups", "not ilike", "ES003160"),
        ],
        balearic=[
            ("llista_preu", "ilike", "INSULAR"),
            ("cups", "not ilike", "ES003160"),
        ],
        canary=[
            ("cups", "ilike", "ES003160"),
        ],
    )
    if zone:
        polissa_filters += zone_conditions[zone]

    polissa_ids = polissa_model.search(polissa_filters)
    polisses = polissa_model.read(polissa_ids[10], ["titular"])

    return polisses["titular"][0]


erp_option = click.option(
    "--erp",
    "-e",
    "erp_instance",
    type=click.Choice(configdb.erppeek_profiles.keys()),
    default="prod",
    help="ERP instance",
)


@click.group(
    help="""\
Generates a .env.development to emulate the dashboard
being inside the virtual office with a given user logged.
You can locate the user by nif or by traits of their
contracts.

Examples:

generate_env.py bypartner 12345678X

generate_env.py bycontract 12345

generate_env.py bycontract --tariff 2.0TD

generate_env.py bycontract --tariff 2.0TD --zone balearic

generate_env.py bycontract --tariff 2.0TD --zone balearic
"""
)
def cli():
    pass


@cli.command(
    help="Generate .env.development for a given user having VAT as nif/vat",
)
@erp_option
@click.argument(
    "vat",
)
def bypartner(vat, erp_instance):
    erp = erppeek.Client(**configdb.erppeek_profiles.get(erp_instance))
    partner_model = erp.model("res.partner")
    vat = vat if vat[:2].isalpha() else "ES" + vat
    partner = partner_model.read(
        [
            ("vat", "=", vat),
        ]
    )[0]
    output_config(erp, partner)


@cli.command()
@erp_option
@click.option(
    "--tariff",
    "-t",
    type=click.Choice(["2.0TD", "3.0TD"]),
    default="2.0TD",
    help="Filter by contract",
)
@click.option(
    "--zone",
    "-z",
    type=click.Choice(["canary", "balearic", "peninsular"]),
    default=None,
)
def bycontract(tariff, zone, erp_instance):
    """Select the user by the traits of their contracts"""
    erp = erppeek.Client(**configdb.erppeek_profiles.get(erp_instance))
    partner_id = search_partner_by_contract_traits(erp, tariff, zone)

    partner_model = erp.model("res.partner")
    partner = partner_model.read(partner_id)
    output_config(erp, partner)


if __name__ == "__main__":
    cli()
