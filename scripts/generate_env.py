#!/usr/bin/env python
import click
import configdb
import erppeek
import json
from random import randrange
from consolemsg import fail

def unlistify(x):
    """Given a list of result, returns the first one or None if no result"""
    if type(x) not in (tuple, list):
        return x
    return (x or [None])[0]

def fk_id(x):
    """Given a foreign key tuple (id, name) return the id"""
    return x[0]

def fk_name(x):
    """Given a foreign key tuple (id, name) return the name"""
    return x[1]

def timetable(polissa):
    if fk_name(polissa["tarifa"]) == "2.0TD":
        return "Taula_Peatges_20"
    if fk_name(polissa["cups"]).startswith("ES003160"):
        return "Taula_Peatges_30_60_Canaries"
    if "_INSULAR" in fk_name(polissa["llista_preu"]):
        return "Taula_Peatges_30_60_Balears"
    return "Taula_Peatges_30_60_Peninsular"


def output_config(erp, partner_id):
    partner_model = erp.model("res.partner")
    partner = partner_model.read(partner_id)
    polissa_model = erp.model("giscedata.polissa")
    polissa_filters = [
        ("titular", "=", partner["id"]),
    ]
    polissa_ids = polissa_model.search(polissa_filters)
    polisses = polissa_model.read(polissa_ids)
    data = [
        dict(
            name=polissa["name"],
            tariff_timetable_id=timetable(polissa),
            cups=fk_name(polissa["cups"]),
            tariff=fk_name(polissa["tarifa"]),
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
    relation="titular",
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
    polisses = polissa_model.read(polissa_ids[randrange(len(polissa_ids))], [relation])

    return fk_id(polisses[relation])

def search_partner_by_vat(erp, vat):
    partner_model = erp.model("res.partner")
    vat = vat if vat[:2].isalpha() else "ES" + vat
    return unlistify(partner_model.search([
            ("vat", "=", vat),
    ]))

def search_partner_by_contract_name(erp, contract, relation='titular'):
    polissa_model = erp.model("giscedata.polissa")
    contract_id = unlistify(polissa_model.search([
            ("name", "=", contract),
    ]))
    if not contract_id:
        return None
    polissa = unlistify(polissa_model.read(contract_id, [relation]))
    return fk_id(polissa[relation])

@click.command(
    help="""\
Generates a .env.development to emulate the dashboard
being inside the virtual office with a given user logged.
You can locate the user by nif or by traits of their
contracts.

Examples:

generate_env.py --vat 12345678X

generate_env.py --contract 12345

generate_env.py --tariff 2.0TD

generate_env.py --tariff 2.0TD --zone balearic

generate_env.py --tariff 2.0TD --zone balearic
"""
)
@click.option(
    "--erp",
    "-e",
    "erp_instance",
    type=click.Choice(configdb.erppeek_profiles.keys()),
    default="prod",
    help="ERP instance",
)
@click.option(
    "--vat",
    "-v",
    default=None,
    help="Filter by partner VAT or NIF",
)
@click.option(
    "--tariff",
    "-t",
    type=click.Choice(["2.0TD", "3.0TD", "6.1TD", "6.2TD", "6.3TD", "6.4TD", "3.0TDVE", "6.1TDVE"]),
    default="2.0TD",
    help="Filter by contract tariff",
)
@click.option(
    "--zone",
    "-z",
    type=click.Choice(["canary", "balearic", "peninsular"]),
    default=None,
    help="Filter by contract electric zone",
)
@click.option(
    "--contract",
    "-c",
    help="Filter by contract name",
    default=None,
)
@click.option(
    "--relation",
    "-r",
    type=click.Choice(["titular", "pagador", "administradora"]),
    default="titular",
    help="Use this relation to filter partner by contract",
)
def cli(vat, tariff, zone, contract, relation, erp_instance):
    """Select the user by the traits of their contracts"""
    erp = erppeek.Client(**configdb.erppeek_profiles.get(erp_instance))
    if vat:
        partner_id = search_partner_by_vat(erp, vat)
        if not partner_id:
            fail(f"No partner found with VAT {vat}")
    elif contract:
        partner_id = search_partner_by_contract_name(erp, contract, relation)
        if not partner_id:
            fail(f"No contract found {contract}")
    else:
        partner_id = search_partner_by_contract_traits(erp, tariff, zone, relation)

    output_config(erp, partner_id)


if __name__ == "__main__":
    cli()
