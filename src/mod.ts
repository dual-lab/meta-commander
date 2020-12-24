import {Command} from "commander";
import {__internal__} from "./internal";
import {Ctor} from "./util/types";

export {CommandMeta} from "./meta/command";
export {OptionMeta} from "./meta/options";
export {Ctor} from "./util/types";

/**
 * Create and retrive the commander instance. This instance is built using
 * the configuration defined into the meta decorators (\@MetaCommand, \@MetaOption ...).
 * Before use this decorators you need to import into yuor main files reflect-metadata
 * npm module.
 *
 * Example:
 * ```typescript
 * import 'reflect-metadata';
 * import {CommandMeta, OptionMeta, program} from '../src/mod';
 *
 *
 * \@CommandMeta('1.0.0')
 * class Proposal1 {
 *   @OptionMeta({})
 *   debug?: boolean;
 * }
 *
 * program(Proposal1).parseAsync(process.argv);
 * ```
 * @param metaIstance - constructor function 
 * @returns Command commander instance
 * @beta
 */
export function program(metaIstance: Ctor<any>): Command {
  {new metaIstance();}
  return __internal__.getCommandMetaOnce(metaIstance.prototype);
}


