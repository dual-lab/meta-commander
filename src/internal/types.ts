/**
 * @internal
 */
export function getMetaType(target: any, key: string): JSType {
  return Reflect.getMetadata("design:type", target, key);
}
/**
 * @internal
 */
export function getMetaParamTypes(target: any, key: string): Array<JSType> {
  return Reflect.getMetadata("design:paramtypes", target, key);
}
/**
 * @internal
 */
export function getMetaReturnType(target: any, key: string): JSType {
  return Reflect.getMetadata("design:returntype", target, key);
}
/**
 * @internal
 */
export type JSType = Boolean | typeof Array | String | Object | FunctionConstructor | Function;
