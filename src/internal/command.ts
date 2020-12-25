import {Command} from "commander";

const COMMAND_META = Symbol('COMMAND__META');
const SUB_COMMAND_META = Symbol('SUB_COMMAND__META');
const ACTION_HANDLER_META = Symbol('ACTION_HANDLER__META');

/**
 * @internal
 */
export type SubCommandAgrs = [Command, boolean, boolean];
/**
 * @internal
 */
export function hasCommandMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(COMMAND_META, target);
}
/**
 * @internal
 */
export function setCommandMeta(target: any, command: Command) {
  Reflect.defineMetadata(COMMAND_META, command, target);
}
/**
 * @internal
 */
export function getCommandMetaOnce(target: any) {
  if (!hasCommandMeta(target)) {
    throw new Error(`Command metadata not found on  target. Use @MetaCommand decorator
      on the current target.`);
  }
  const value = Reflect.getOwnMetadata(COMMAND_META, target);
  Reflect.deleteMetadata(COMMAND_META, target);
  return value;
}
/**
 * @internal
 */
export function hasSubCommandMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(SUB_COMMAND_META, target);
}
/**
 * @internal
 */
export function getSubCommandMeta(target: any): SubCommandAgrs[] {
  return Reflect.getOwnMetadata(SUB_COMMAND_META, target);
}
/**
 * @internal
 */
export function setSubCommandMeta(target: any, ...command: SubCommandAgrs[]) {
  let subCommand: SubCommandAgrs[] = [];
  if (hasSubCommandMeta(target)) {
    subCommand = getSubCommandMeta(target);
  }
  Reflect.defineMetadata(SUB_COMMAND_META, subCommand.concat(command), target);
}
/**
 * @internal
 */
export function getSubCommandMetaOnce(target: any): SubCommandAgrs[] {
  if (!hasSubCommandMeta(target)) {
    return [];
  }
  const value = Reflect.getOwnMetadata(SUB_COMMAND_META, target);
  Reflect.deleteMetadata(SUB_COMMAND_META, target);
  return value;
}
/**
 * @internal
 */
export function hasActionHandlerMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(ACTION_HANDLER_META, target);
}
/**
 * @internal
 */
export function setActionHandlerMeta(target: any, handler: Function) {
  Reflect.defineMetadata(ACTION_HANDLER_META, handler, target);
}
/**
 * @internal
 */
export function getActionHandlerMetaOnce(target: any) {
  const value = Reflect.getOwnMetadata(ACTION_HANDLER_META, target);
  Reflect.deleteMetadata(ACTION_HANDLER_META, target);
  return value;
}

