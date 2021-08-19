![](https://img.shields.io/npm/v/@mand-mobile/vue-cli-plugin-builder?label=%40mand-mobile/vue-cli-plugin-builder)

# vue-cli-plugin-builder

Custom Vue CLI commands for development and building for different platforms by [platform-builder](../platform-builder)

## Usage

### preview

```bash
vue-cli-service md-preview
```

- Options
  - platform - uni/web...
  - watch
  - output - uniapp dist
  - export - build examples
  - mode - development/production...

### install

```bash
vue-cli-service md-install
```

- Options
  - platform - uni/web...
  - target - lib/sfc/bundle
  - output - uniapp dist
  - unit - px/vw
  - mode - development/production...