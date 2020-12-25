import {Command} from "commander";
import {__internal__} from "../internal";
import type {Ctor} from "../util/types";

/**
 * Command config object, used when defineing sub command
 *@beta
 */
export interface CommandConfig {
  /**
   * Command name
   */
  name?: string;
  /**
   * Command description
   */
  description?: string;
  /**
   * Command version
   */
  version?: string;
  /**
   * Command with values
   */
  withValue?: {
    optional?: boolean;
    descName?: string;
    vardiac?: boolean;
  }
}

/**
 * Commad decorator used on the class that rappresent the main program or class 
 * that rappresent sub command.
 *
 * @param config - the command config {@link CommandConfig}
 * @beta
 */
export function CommandMeta<T extends Ctor<{}>>(config: CommandConfig) {
  const __program = new Command();
  __program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false);
  return function (ctor: T): T {
    // Store version and name
    __program
      .name(config.name ?? ctor.name?.toLowerCase())
      .description(config.description ?? '')
      .version(config.version!);
    // set arguments if with value
    if (config.withValue) {
      __program.arguments(__internal__.composeValue(config.withValue));
    }
    // Collect all option from meta data.
    (__internal__.getOptionMetaOnce(ctor.prototype) ?? [])
      .forEach(([flags, desc, processor, value, required]) => required ? __program.requiredOption(flags, desc, processor, value)
        : __program.option(flags, desc, processor, value));

    // Set action handler
    if (__internal__.hasActionHandlerMeta(ctor.prototype)) {
      __program.action(__internal__.getActionHandlerMetaOnce(ctor.prototype));
    }
    // Collect all sub command
    (__internal__.getSubCommandMetaOnce(ctor.prototype) ?? [])
      .forEach(([cmd, isDefault, hidden]) => __program.addCommand(cmd, {isDefault, hidden}));

    __internal__.setCommandMeta(ctor.prototype, __program as Command);
    return ctor;
  }
}

/**
 * Sub command decorator used on filed of type a class decorated with the Command decorator.
 *
 * @example
 * ```typescript
 * @CommandMeta({
 *   name: 'brew',
 *   description: 'Brew a cup of coffe',
 *   withValue: {
 *     vardiac: false,
 *     descName: 'coffeType',
 *     optional: false
 *   }
 * })
 * class Brew {
 *   @OptionMeta({
 *     description: 'Enable debug mode',
 *     shortName: 'd',
 *     longName: 'debug'
 *   })
 *   debug?: boolean;
 *
 *   @ActionHandler
 *   brewCoffe(args, options){
 *    // TO something special :-D
 *   }
 * }
 *
 * @CommandMeta({
 *   version: '1.0.0',
 *   name: 'my-cli'
 * })
 * class MyCli {
 *  @SubCommandMeta()
 *  brew?: Brew;
 * }
 * ```
 *
 * @beta
 * @param isDefault - If this sub commond is the dafault one
 * @param hidden - if this command shuold be hidden from help message
 */
export function SubCommandMeta(isDefault: boolean = false, hidden: boolean = false) {
  return function (proto: any, key: string, description?: PropertyDescriptor) {
    if (!!description) {
      throw new Error('@SubCommandMeta decorator is suppoted only on class fields');
    }
    const ctor = __internal__.getMetaType(proto, key) as FunctionConstructor;
    {new ctor();}
    __internal__.setSubCommandMeta(proto, [__internal__.getCommandMetaOnce(ctor.prototype), isDefault, hidden]);
  }
}


/**
 * Annotate the method that would handler the sub command action
 * @beta
 */
export function ActionHandler(proto: any, key: string, descriptor: PropertyDescriptor) {
  if (!descriptor) {
    throw new Error('@ActionHandler decorator is suppoted only on class methods');
  }
  __internal__.setActionHandlerMeta(proto, descriptor.value);
}
