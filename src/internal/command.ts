import {Command} from "commander";

const COMMAND_META = Symbol('COMMAND__META');

export function hasCommandMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(COMMAND_META, target);
}

export function setCommandMeta(target: any, command: Command) {
  Reflect.defineMetadata(COMMAND_META, command, target);
}

export function getCommandMetaOnce(target: any): Command {
  console.info(typeof target, target);
  if (!hasCommandMeta(target)) {
    throw new Error(`Command metadata not found on  target. Use @MetaCommand decorator
      on the current target.`);
  }
  const value = Reflect.getOwnMetadata(COMMAND_META, target);
  Reflect.deleteMetadata(COMMAND_META, target);
  return value;
}

