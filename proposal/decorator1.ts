import 'reflect-metadata';
import {CommandMeta, OptionMeta, program} from '../src/mod';


@CommandMeta('1.0.0')
class Proposal1 {
  @OptionMeta({
    description: 'Enable debug mode',
    shortName: 'd',
    longName: 'debug'
  })
  debug?: boolean;
  @OptionMeta({
    shortName: 'p',
    longName : 'pizza',
    withValue: {
      descName: 'types'
    }
  })
  pizza?: string[];
  @OptionMeta({
    shortName: 'v',
    description: 'verbosity tha can be incresed',
    withValue: {
      defaultValue: 0
    }
  })
  verbose?(value: number, prev: number): number {
    return 1 + prev;
  }
}

const cli = program(Proposal1);

cli.parse(process.argv);
console.info('verbosity', cli.opts().v);
