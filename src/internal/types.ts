/**
 * @internal
 */
export function getMetaType(target: any, key: string): Boolean | typeof Array | String | Object {
 return Reflect.getMetadata("design:type", target, key);
} 
/**
 * @internal
 */
export function getMetaParamTypes(target: any, key: string): Array<Boolean | typeof Array | String | Object> {
 return Reflect.getMetadata("design:paramtypes", target, key);
} 
/**
 * @internal
 */
export function getMetaReturnType(target: any, key: string): Boolean | typeof Array | String | Object {
 return Reflect.getMetadata("design:returntype", target, key);
} 
