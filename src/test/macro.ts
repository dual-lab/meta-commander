import {Macro} from "ava";
import {program} from "../mod";

export const throwErrorDuringDecoration: Macro<[Array<() => void>, Array<string | RegExp>]> = (t, configs, expectedErrors) => {
  t.plan(configs.length * 2);
  configs.forEach((fn, idx) => {
    const unsupportedError = t.throws(() => {fn();}, {instanceOf: Error});
    t.is(unsupportedError.message, expectedErrors[idx]);

  })
}

export const supportedMemberDecorator: Macro<[Array<() => void>]> = (t, configs) => {
  t.plan(configs.length);
  configs.forEach((fn) => {
    t.notThrows(() => {fn();}, 'Decorator used on supported member');
  })
}

export const optionCorrectlyParsed: Macro<[Array<() => any>, string[][], Array<{[key: string]: any}>]> = (t, configs, args, expectedOpts) => {
  configs.forEach((fn, idx) => {
    const cli = program(fn());
    cli.parse(args[idx], {from: 'user'});
    const opts = cli.opts();
    const exOpts = expectedOpts[idx];
    const optKeys = Object.keys(exOpts);
    t.plan(optKeys.length);

    optKeys.forEach(oKey => {
      t.deepEqual(opts[oKey], exOpts[oKey], `Options ${oKey} not equal to ${exOpts[oKey]}`);
    });
  });
}

export const correctNameAndVersion: Macro<[Array<(name: string, version: string) => any>, Array<[string, string]>]> = (t, configs, args) => {
  configs.forEach((fn, idx) => {
    const [name, version] = args[idx];
    const cli = program(fn(name, version));
    cli.parse();
    t.is(cli.name(), name, `The cli name not match ${name}`);
    // FIXME: cast to any due to error in commader declaration file
    t.is(cli.version(undefined as any) as any, version, `The cli version not match ${version}`);
  });
}

export const subcommandCorrectlyCalled: Macro<[Array<(cb: () => void, d?: boolean, h?: boolean) => any>, string[][], boolean]> = (t, configs, args, isDefault) => {
  configs.forEach((fn, idx) => {
    let _spied = false;
    const cli = program(fn(() => _spied = true, isDefault));
    cli.parse(args[idx], {from: 'user'});

    t.assert(_spied, 'Sub command not executed called')
  });
}

export const subcommandHidden: Macro<[Array<(cb: () => void, d?: boolean, h?: boolean) => any>]> = (t, configs) => {
  configs.forEach((fn, idx) => {
    const cli = program(fn(() => {}, false, true));
    

    t.assert(false, 'Sub command is not hidden from help message')
  });
}
