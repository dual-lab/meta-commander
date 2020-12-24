// Copyright (c) dual-lab Company. All rights reserved. Licensed under the MIT license.

/**
 * A library for building commader program using static decorators.
 * The program's instance is built using
 * the configuration defined into the meta decorators (\@MetaCommand, \@MetaOption ...).
 *
 * @example
 * ```typescript
 * import 'reflect-metadata';
 * import {CommandMeta, OptionMeta, program} from '../src/mod';
 *
 *
 * @CommandMeta('1.0.0')
 * class Proposal1 {
 *   @OptionMeta({})
 *   debug?: boolean;
 * }
 *
 * program(Proposal1).parseAsync(process.argv);
 * ```
 *
 * @remarks
 * Before use this decorators you need to import into yuor main files reflect-metadata
 * npm module.
 *
 * @packageDocumentation
 */

import {Command} from "commander";
import {__internal__} from "./internal";
import {Ctor} from "./util/types";

export {CommandMeta} from "./meta/command";
export {OptionMeta} from "./meta/options";
export {Ctor} from "./util/types";

/**
 * Create and retrive the commander instance.
 * @param metaIstance - Constructor function 
 * @returns Commander instance
 * @beta
 */
export function program(metaIstance: Ctor<any>): Command {
  {new metaIstance();}
  return __internal__.getCommandMetaOnce(metaIstance.prototype);
}


