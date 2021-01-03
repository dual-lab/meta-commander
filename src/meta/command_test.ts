import test from 'ava';
import {configuration, macro} from '../test';


test('Command meta generate a program with correct name and version'
, macro.correctNameAndVersion
, [configuration.myCliWithVersionAndName]
, [['my-cli', '0.0.0']]);

test('Command meta generate a program with sub command'
, macro.subcommandCorrectlyCalled
, [configuration.myCliWithSubCommandMeta]
, [['subcommand1']]
, false);


test('SubCommand meta is not supported on methods'
, macro.throwErrorDuringDecoration
, [configuration.myCliWithSubCommandMetaOnMethods]
, ['@SubCommandMeta decorator is suppoted only on class fields']);

test('SubCommand meta setup correctly isDefault configuration.'
, macro.subcommandCorrectlyCalled
, [configuration.myCliWithSubCommandMeta]
, [[]]
, true);

test('SubCommand meta setup correctly hidden configuration.'
, macro.subcommandHidden
, [configuration.myCliWithSubCommandMeta]
);
