import {Command} from "commander";
import {__internal__} from "../internal";
import type {Ctor} from "../util/types";

/**
 * @beta
 */
export function CommandMeta<T extends Ctor<{}>>(version: string) {
  const __program = new Command();
  __program.version(version);
  return function (ctor: T): T {
    // Collect all option from meta data.
    (__internal__.getOptionMetaOnce(ctor.prototype) ?? [])
      .forEach(([flags, desc, processor, value]) => __program.option(flags, desc, processor, value));
    
    //TODO Collect sub command
    //TODO? Collect sub arguments
    
    __internal__.setCommandMeta(ctor.prototype, __program as Command);
    return ctor;
  }
}

