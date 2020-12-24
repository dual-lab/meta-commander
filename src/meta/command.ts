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
    //TODO read all metadata configurated on ctor.proto.
    //TODO build the main commander
    __internal__.setCommandMeta(ctor.prototype, __program as Command);
    return ctor;
  }
}

