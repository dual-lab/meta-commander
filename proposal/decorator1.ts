import 'reflect-metadata';
import {CommandMeta, OptionMeta, program} from '../src/mod';


@CommandMeta('1.0.0')
class Proposal1 {
  @OptionMeta({})
  debug?: boolean;
  @OptionMeta({})
  debugs?: string[];
  @OptionMeta({})
  debuged?(pippo: number, ciao: string): boolean {
    return false;
  }
}

program(Proposal1).parseAsync(process.argv);
