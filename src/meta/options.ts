import {__internal__} from "../internal"

/**
 * Meta option decorator configuration object.
 * @beta
 */
export interface OptionConfig {
  /**
   * The short option character. if not specified it will be inferred from
   * the first letter of field or method name. To suppress short name 
   * put equal to `false`
   *
   * @example
   * ```typescript
   *
   * @MetaCommand
   * class MyCli {
   *  @MetaOption({
   *    shortName: 'd'
   *  })
   *  debug?: boolean;
   * }
   *
   * ```
   *
   * @example
   * ```bash
   * my-cli -d
   *
   * ```
   *
   * @remarks
   * Can be suppressed only if the `longName` is not.
   */
  shortName?: string | false;
  /**
   * The long option name. If camel case it will be trasformed into
   * kebabe case. If not specified it will be inferred from the name of the field
   * or method. To suppress long name put equal to `false`.
   *
   * @example
   * ```typescript
   *
   * @MetaCommand
   * class MyCli {
   *  @MetaOption({
   *    shortName: 'd'
   *    longName: 'debugEnabled'
   *  })
   *  debug?: boolean;
   * }
   *
   * ```
   *
   * @example
   * ```bash
   * my-cli --debug-enabled
   *
   * ```
   *
   * @remarks
   * Can be suppressed only if the `shortName` is not
   */
  longName?: string | false;
  /**
   * Description of the option will be priinted into the help message
   */
  description?: string;
  /**
   * The option is required. Default is not.
   */
  required?: boolean;
  /**
   * The preceseing opton args' function.
   * see (https://github.com/tj/commander.js#custom-option-processing)
   *
   * @remarks
   * If the {@link OptionMeta | \@OptionMeta} is used on a method. That method will be the processing
   * function.
   */
  processing?: (dummyValue: string, previusValue?: string) => any;
  /**
   * Configuration for option that take a value. 
   */
  withValue?: {
    /**
     * Default value.
     */
    defaultValue?: any;
    /**
     * Value name that will be printed into the help message
     */
    descName?: string;
    /**
     * Value is optional or not.
     */
    optional?: boolean;
    vardiac?: boolean;
  }
}

/**
 * Meta option decorator used to configure option command. This can be put on
 * filed or class methods.
 * If put on class methods this one will be used as the option processor.
 *
 * @remarks
 *  - When used on class method `this` will no longer refer to the instance.
 *  - When used on class fields the name fileds will be used as the short or long name, if those
 *   are not specified inside the configuration object.
 *   If  the field is of array type  then is the option accept and argumente this
 *   will be default vardiac.
 *
 * @param config - Configuration object {@link OptionConfig}
 * @beta
 */
export function OptionMeta(config: OptionConfig) {
  return function (proto: any, key: string, descriptor?: PropertyDescriptor) {
    const optC = __internal__.OptionCommanderComposer.from(config);
    if (descriptor === undefined){
      // infer config from filed metadata
      optC.inferFromField(__internal__.getMetaType(proto, key), key);
    } else if(__internal__.getMetaType(proto, key) === Function && descriptor &&
      descriptor.get === undefined && descriptor.set === undefined) {
      // thake the method as the option processor function
      optC.inferFromMethod(descriptor.value);
    } else {
      throw new Error('@OptionMeta decorator is supported only on fields and instance methods.')
    }
    __internal__.setOptionMeta(proto, optC.compose());
  }
}
