import test from 'ava';
import {configuration, macro} from '../test';

test('OptionMeta is supported only on fields and methods',
  macro.throwErrorDuringDecoration,
  [configuration.myCliWithOptionMetaOnAccessor],
  ['@OptionMeta decorator is supported only on fields and instance methods.']
);

test('OptionMeta on method set it as option processor',
  macro.optionCorrectlyParsed,
  [configuration.myCliWithOptionMetaOnMethod],
  [['-v', '-v', '-v']],
  [{verbosity: 3}]
);


test('OptionMeta must have at least one of shortName or longName',
  macro.throwErrorDuringDecoration,
  [configuration.myCliWithOptionWithoutLongAndShortName],
  ['Option config validation error: Short name and long name cannot be deactivated at the same time']
);

test('OptionMeta infer shortName and longName from type metadata if not in configuration',
  macro.optionCorrectlyParsed,
  [configuration.myCliWithOptionMetaOnField],
  [['--debug']],
  [{debug: true}]);

test('OptionMeta infer vardiac args from type metadata if not in configuration',
  macro.optionCorrectlyParsed,
  [configuration.myCliWithVardiacOption],
  [['--letter', 'a', 'b' ,'c']],
  [{letter: ['a', 'b', 'c']}]
);

