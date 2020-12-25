import {OptionConfig} from "../meta/options";
import {JSType} from "./types";

const OPTION_META = Symbol('OPTION_META');

/**
 * @internal
 */
export type CommanderOptionArgs = [string, string, (value: string, prev: string) => any, Exclude<any, Function>, boolean];
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

/**
 * @internal
 */
export class OptionCommanderComposer {
  static from(config: OptionConfig) {
    return new OptionCommanderComposer(config);
  }

  #metaConfig: OptionConfig;

  constructor(metaConfig: OptionConfig = {}) {
    this.#metaConfig = metaConfig;
    const error = this.validatePartial();
    if (error) {
      throw new Error(`Option config validation error: ${error}`);
    }
  }

  compose(): CommanderOptionArgs {
    const error = this.validate();
    if (error) {
      throw new Error(error);
    }
    const flags = [
      `${this.shortName},`
      , this.longName
      , this.value
    ].filter(Boolean);

    return [
      flags.join(' '),
      this.#metaConfig.description!,
      this.#metaConfig.processing!,
      this.#metaConfig?.withValue?.defaultValue,
      this.#metaConfig.required === true
    ];
  }

  inferFromField(metaType: JSType, name: string): this {
    //
    // Infer long and short name and description from field name
    const {shortName, longName, description} = this.#metaConfig;
    if (shortName !== false && !shortName) {
      this.#metaConfig.shortName = name.charAt(0);
    }

    if (longName !== false && !longName) {
      this.#metaConfig.longName = name;
    }

    if (!description) {
      this.#metaConfig.description = name;
    }

    //
    // Infer vardiac if is an array
    const {withValue} = this.#metaConfig;
    if (withValue !== undefined) {
      if (withValue.vardiac === undefined) {
        withValue.vardiac = metaType === Array;
      }
    } 

    return this;
  }

  inferFromMethod(processor: (value: any, prev: any) => any): this {
    if (this.#metaConfig.processing === undefined) {
      this.#metaConfig.processing = processor;
    }
    return this;
  }

  private get shortName(): string {
    const {shortName} = this.#metaConfig;
    return !shortName ? '' : `-${this.#metaConfig.shortName}`
  }

  private get longName(): string {
    const {longName} = this.#metaConfig;
    return !longName ? '' : `--${longName.replace(/_/g, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
  }

  private get value(): string {
    const {withValue} = this.#metaConfig;
    const delimiter: [string, string] = withValue?.optional === true ? ['[', ']'] : ['<', '>'];

    return withValue?.descName ? `${delimiter[0]}${withValue?.descName ?? 'args'}${withValue?.vardiac === true ? '...' : ''}${delimiter[1]}` : '';
  }

  private validatePartial(): string | null {
    // Short name and long name cannot be deactivated at the same time
    const {shortName, longName} = this.#metaConfig;
    if (shortName === false && longName === false) {
      return 'Short name and long name cannot be deactivated at the same time';
    }
    // Short name must be a character
    if (shortName && shortName.length > 1) {
      return 'Short name must be a character';
    }

    return null;
  }

  private validate(): string | null {
    const error = this.validatePartial();
    if (error) {
      return error
    }

    // shortName or longName must be specified
    const {shortName, longName} = this.#metaConfig;
    if (!shortName && !longName) {
      return `Shortname or longName must be specified or with config or using the Option 
      decorator on class field`;
    }

    return null;
  }
}
