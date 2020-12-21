import 'reflect-metadata';
import {CommandMeta, OptionMeta, program} from '../src/mod';


@CommandMeta('1.0.0')
class Proposal1 {
  @OptionMeta({})
  debug?: boolean;
}

program(Proposal1).parseAsync(process.argv);
