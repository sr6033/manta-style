# Manta Style [![CircleCI](https://img.shields.io/circleci/project/github/Cryrivers/manta-style.svg?style=flat-square)](https://circleci.com/gh/Cryrivers/manta-style) [![Codecov](https://img.shields.io/codecov/c/github/Cryrivers/manta-style.svg?style=flat-square)](https://codecov.io/gh/Cryrivers/manta-style/) [![GitHub](https://img.shields.io/github/license/Cryrivers/manta-style.svg?style=flat-square)](https://github.com/Cryrivers/manta-style/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/Cryrivers/manta-style.svg?style=flat-square)](https://greenkeeper.io/) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)

<p align="center">
  <img src="manta_style_small.png">
</p>

> 🚀 Futuristic API Mock Server for Frontend

## Motivation

[Manta Style](https://github.com/Cryrivers/manta-style/issues/1) generates "real" _(enough)_ mock data from your type definitions.

With _Manta Style_, you can start implementing feature once your data schema is defined.
But _Manta Style_ is more than just that.

### Generates mock data directly from your type declarations

Manta Style officially supports [TypeScript](https://www.typescriptlang.org) and [Flow](http://flowtype.org/) at the moment.

<!-- some more words goes here @TODO wgao19 -->

### Mock data with respect to real world scenario such as past dates, addresses, names

```ts
interface User {
  /**
   * @faker {{internet.userName}}
   *
   */
  userName: string; // Amina.Langosh49

  /**
   * @faker date.past
   */
  birthday: number; // 1529370938452

  /**
   * @example Croatia
   */
  country: string; // Croatia
}
```

### Mock conditions specific to your type definitions

```ts
type WithResponseSuccess<T> = {
  status: 'ok';
  data: T;
};

type WithResponseFailure = {
  status: 'error';
  /**
   * @example Bad Request
   */
  message: string;
};

type WithResponse<T> = WithResponseSuccess<T> | WithResponseFailure;
```

Manta Style will generate either the error case or the normal case according to your declarations.
Already have your list of error conditions and messages well-defined with your back end? You are in the luck! Manta Style will generate those cases for you just like in real world.

This also gives us one more motivation to fine-tune the typing to our codebase.

### Fix a test case like a snapshot.

Implementing boundary cases has been hair pulling. With Manta Style you can supply a snapshot and have it returned every time until you finish.

### ... and more

Need more feature? [Create an issue](https://github.com/Cryrivers/manta-style/issues/new/choose) and let us know how Manta Style can help you.

## Documentation

<!-- TODO: move to docsite url -->

Check out the [Quick Start](./documentation/QuickStart.md) page for a quick overview.

The documentation is divided into the following sections:

- [Installation](./documentation/Installation.md)
- [Quick Start](./documentation/QuickStart.md)
- [Usage](./documentation/Usage.md)
- [Plugins](./documentation/Plugins.md)
- API Reference

## Contributing

### Getting Started

```sh
npm install
npm run bootstrap
npm run build
```

## Acknowledgments

- [Zhongliang Wang](https://github.com/Cryrivers) for original idea, architecture design, initial implementation of runtime and transformers.
- [Tan Li Hau](https://github.com/tanhauhau) for the design and implementation of selective mocking, plugin system, FlowType support and many official plugins.
- [Jennie Ji](https://github.com/JennieJi) for implementation of live-reload feature.
- [Wei Gao](https://github.com/wgao19) for brilliant documentation.

## License

Manta Style is [MIT licensed](https://github.com/Cryrivers/manta-style/blob/master/LICENSE)
