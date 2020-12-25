import {Command} from "commander";
import {__internal__} from "../internal";
import type {Ctor} from "../util/types";

/**
 * Main commad decorator used on the class that rapresent the main program.
 *
 * @param version - ther program version
 * @param name - the program name default to class name
 * @beta
 */
export function CommandMeta<T extends Ctor<{}>>(version: string, name?: string) {
  const __program = new Command();
  __program
    .storeOptionsAsProperties(false);
  return function (ctor: T): T {
    // Store version and name
    __program
    .version(version)
    .name(name ?? ctor.name);
    // Collect all option from meta data.
    (__internal__.getOptionMetaOnce(ctor.prototype) ?? [])
      .forEach(([flags, desc, processor, value, required]) => required ? __program.requiredOption(flags, desc, processor, value)
        : __program.option(flags, desc, processor, value));


    //TODO Collect sub command
    //TODO? Collect sub arguments

    __internal__.setCommandMeta(ctor.prototype, __program as Command);
    return ctor;
  }
}

