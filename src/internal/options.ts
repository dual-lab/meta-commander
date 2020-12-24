const OPTION_META = Symbol('OPTION_META');

/**
 * @internal
 */
export type CommanderOptionArgs = [string, string] | [string, string, Function]
  | [string, string, Exclude<any, Function>] | [string, string, Function, Exclude<any, Function>];
/**
 * @internal
 */
export function hasOptionMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(OPTION_META, target);
}

/**
 * @internal
 */
export function getOptionMetaOnce(target: any): CommanderOptionArgs[] {
  let optionArgs: CommanderOptionArgs[] = [];
  if (hasOptionMeta(target)) {
    optionArgs = getOptionMeta(target);
    Reflect.deleteMetadata(OPTION_META, target);
  }
  return optionArgs;
}

/**
 * @internal
 */
export function getOptionMeta(target: any): CommanderOptionArgs[] {
  return Reflect.getOwnMetadata(OPTION_META, target);
}

/**
 * @internal
 */
export function setOptionMeta(target: any, ...values: CommanderOptionArgs[]): void {
  let fullValues: CommanderOptionArgs[] = [];
  if (hasOptionMeta(target)) {
    fullValues = getOptionMeta(target);
  }
  Reflect.defineMetadata(OPTION_META, fullValues.concat(values), target);
}
