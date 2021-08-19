# Mand Mobile@3.0

![](https://img.shields.io/github/checks-status/mand-mobile/mand-mobile-3/master?style=flat-square) ![](https://img.shields.io/github/license/mand-mobile/mand-mobile-3?style=flat-square) ![](https://img.shields.io/badge/mand--mobile%403.0-unreleased-lightgrey?style=flat-square)

🐡 A mobile UI toolkit designed for financial scenarios, and compatible with **multiple platforms** based on Vue DSL(**Vue 2.0**).

* Webapp
* Uniapp
* ...

> Refer to other versions according to your preference : 

* [mand-mobile@2](https://github.com/didi/mand-mobile) - General available version.
* [mand-mobile-next](https://github.com/mand-mobile/mand-mobile-next) -  A special version based on **Vue 3.0**.

---

## ⚠️ Status: WIP - Closed beta

> Not released externally, only internal projects for trial

## Preview

|H5|微信小程序|
| --- | --- |
|<img src="https://pt-starimg.didistatic.com/static/starimg/img/HVpAVyKV6E1629362368493.png" width="120">|<img src="https://pt-starimg.didistatic.com/static/starimg/img/U201LJnt021629362455710.jpg" width="120">|

## Features

### M0

- [x] Improve runtime difference smoothing for multiple platforms (Web/Uniapp) **based on Vue 2.x**
- [x] Refactor the underlying scroller module based on BetterScroll

### M1

- [x] Perfect engineering, construct a monorepo
- [x] Abstract serve & build process for multiple platforms
- [x] Improve code specifications
- [x] Improve documentations
- [x] Upgraded visual specification to **3.0**
- [x] Refactor the site based on **Vuepress** or **Vitepress**
- [ ] Support internationalization
- [ ] Improve components testing

### M2

`UNNECESSARY` 

- [ ] Upgrade Vue to **v3.0**
- [ ] Refactor some components based on **Composition API**

---

## Packages

* [@mand-mobile/components](./packages/components)
* [@mand-mobile/platform-runtime](./packages/platform-runtime)
* [@mand-mobile/platform-builder](./packages/platform-builder)
* [@mand-mobile/shared](./packages/shared)
* [@mand-mobile/scroller](./packages/scroller)
* [@mand-mobile/vue-cli-plugin-builder](./packages/vue-cli-plugin-builder)

## Contribution

See [Development Guide](./DEVELOPMENT.md).

### Bootstrap

```bash
yarn install
yarn bootstrap
```

### Dev preview

* Platform

```bash
# all
yarn serve-all

# web
yarn serve:web

# uni
yarn serve:uni
```

* Single Component

```bash
yarn serve-single:web button

# or

yarn serve-single:uni button
```

## Architecture

<img src="https://pt-starimg.didistatic.com/static/starimg/img/o7q8VJJY6l1594973217799.png" width="600" alt="" />

## License

<img alt="Apache-2.0 license" src="https://www.apache.org/img/ASF20thAnniversary.jpg" width="128">