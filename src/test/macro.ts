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
