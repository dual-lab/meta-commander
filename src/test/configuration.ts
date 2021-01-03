import {OptionMeta} from "../meta/options";
import {ActionHandler, CommandMeta, SubCommandMeta} from "../meta/command";

export function myCliWithOptionMetaOnAccessor() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithOptionMetaOnAccessor {

    @OptionMeta({})
    get incorrectOptionMeta(): number {
      return 0;
    }
  }
  return MyCliWithOptionMetaOnAccessor;
}

export function myCliWithOptionMetaOnMethod() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithOptionMetaOnMethod {

    @OptionMeta({
      shortName: 'v',
      longName: 'verbosity',
      withValue: {
        defaultValue: 0
      }
    })
    verbosity(value: unknown, prev: number): number {
      return prev + 1;
    }
  }

  return MyCliWithOptionMetaOnMethod;
}

export function myCliWithOptionWithoutLongAndShortName() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithOptionWithoutLongAndShortName {

    @OptionMeta({
      shortName: false,
      longName: false,
      withValue: {
        defaultValue: 0
      }
    })
    verbosity(value: unknown, prev: number): number {
      return prev + 1;
    }
  }

  return MyCliWithOptionWithoutLongAndShortName;
}

export function myCliWithOptionMetaOnField() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithOptionMetaOnField {
    @OptionMeta({})
    debug: boolean;
  }

  return MyCliWithOptionMetaOnField;
}

export function myCliWithVardiacOption() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithVardiacOption {
    @OptionMeta({
      withValue: {
        descName: 'letters'
      }
    })
    letter: string[];
  }

  return MyCliWithVardiacOption;
}


export function myCliWithVersionAndName(name: string, version: string) {
  @CommandMeta({
    name, version
  })
  class MyCliWithVersionAndName {

  }

  return MyCliWithVersionAndName;
}

export function myCliWithSubCommandMetaOnMethods() {
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithSubCommandMetaOnMethod {

    @SubCommandMeta()
    incorrectSubcommandMeta(): number {
      return 0;
    }
  }
  return MyCliWithSubCommandMetaOnMethod;
}

export function myCliWithSubCommandMeta(cb = () => {}, isDefault?: boolean, hidden?: boolean) {

  @CommandMeta<any>({
    name: 'subcommand1'
  })
  class SubCommand1 {
    @ActionHandler
    action() {
      cb();
    }
  }
  @CommandMeta<any>({
    version: '0.0.0'
  })
  class MyCliWithSubCommandMeta {

    @SubCommandMeta(isDefault, hidden)
    subcommand1: SubCommand1;
  }
  return MyCliWithSubCommandMeta;
}