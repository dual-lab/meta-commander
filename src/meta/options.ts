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
  shortName?: string;
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
  longName?: string;
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
   * see [https://github.com/tj/commander.js#custom-option-processing](Custom option processing)
   *
   * @remarks
   * If the {@link OptionMeta | \@OptionMeta} is used on a method. That method will be the processing
   * function.
   */
  processing?: (dummyValue: string, previusValue?: string) => any;
  /**
   * Configuration for option that take a value. 
   */
  wtihValue?: {
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
  }
}

/**
 * @beta
 */
export function OptionMeta(config: OptionConfig) {
  //TODO prepare commander options instance
  return function (proto: any, key: any) {
    //TODO add commander config to field metadata
    //TODO if used on a methods use its value as the option parser
    __internal__.setOptionMeta(proto, ['-d', 'pippo'] as __internal__.CommanderOptionArgs);
  }
}
