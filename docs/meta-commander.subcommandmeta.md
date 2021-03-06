<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@dual-lab/meta-commander](./meta-commander.md) &gt; [SubCommandMeta](./meta-commander.subcommandmeta.md)

## SubCommandMeta() function

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Sub command decorator used on filed of type a class decorated with the Command decorator.

<b>Signature:</b>

```typescript
export declare function SubCommandMeta(isDefault?: boolean, hidden?: boolean): (proto: any, key: string, description?: PropertyDescriptor | undefined) => void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  isDefault | boolean | If this sub commond is the dafault one |
|  hidden | boolean | if this command shuold be hidden from help message |

<b>Returns:</b>

(proto: any, key: string, description?: PropertyDescriptor \| undefined) =&gt; void

## Example


```typescript
@CommandMeta({
  name: 'brew',
  description: 'Brew a cup of coffe',
  withValue: {
    vardiac: false,
    descName: 'coffeType',
    optional: false
  }
})
class Brew {
  @OptionMeta({
    description: 'Enable debug mode',
    shortName: 'd',
    longName: 'debug'
  })
  debug?: boolean;

  @ActionHandler
  brewCoffe(args, options){
   // TO something special :-D
  }
}

@CommandMeta({
  version: '1.0.0',
  name: 'my-cli'
})
class MyCli {
 @SubCommandMeta()
 brew?: Brew;
}

```

