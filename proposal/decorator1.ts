import 'reflect-metadata';
import {ActionHandler, CommandMeta, OptionMeta, program, SubCommandMeta} from '../src/mod';

@CommandMeta({
  name: 'brew',
  description: 'Brew a cup of coffe',
  withValue: {
    vardiac: false,
    descName: 'coffeType',
    optional: false
  }
})
class Brew {
  @OptionMeta({
    description: 'Use vhrio',
    longName: 'vhario'
  })
  vhario?: boolean;

  @ActionHandler
  brewCoffe?(coffe: string, options: any) {
    console.info(coffe, options);
  }
}

@CommandMeta({
  version: '1.0.0',
  name: 'decorator1'
})
class Proposal1 {
  @OptionMeta({
    description: 'Enable debug mode',
    shortName: 'd',
    longName: 'debug'
  })
  debug?: boolean;
  @OptionMeta({
    shortName: 'p',
    longName: 'pizza',
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

  @SubCommandMeta(true)
  brew?: Brew;
}



const cli = program(Proposal1);

cli.parse(process.argv, {from: 'user'});
console.info('all cli options', cli.opts());
