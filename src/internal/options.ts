const OPTION_META = Symbol('OPTION_META');

/**
 * @internal
 */
export function hasOptionMeta(target: any): boolean {
  return Reflect.hasOwnMetadata(OPTION_META, target);
}
