export function OptionMeta(config: any) {
  //TODO prepare commander options instance
  return function (proto: any, key: any) {
    //TODO add commander config to field metadata
    //TODO if used on a methods use its value as the option parser
    Reflect.defineMetadata('test:option:mete', 'pippo', proto);
  }
}
