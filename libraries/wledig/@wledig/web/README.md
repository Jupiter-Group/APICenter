# Wledig Web

<img src="./docs/images/wledig-web.gif"
  title="Wledig web components"
  alt="A collection of Wledig web components"
  style="border-radius: 32px">

[![Published on npm](https://img.shields.io/npm/v/%40wledig%2Fweb)](https://www.npmjs.com/package/@wledig/web)
[![Join our Discord](https://img.shields.io/badge/discord-join%20chat-5865F2.svg?logo=discord&logoColor=fff&label=%23wledig)](https://lit.dev/discord/)
[![Test status](https://github.com/wledig-components/wledig-web/actions/workflows/test.yml/badge.svg)](https://github.com/wledig-components/wledig-web/actions/workflows/test.yml)
[![npm Downloads](https://img.shields.io/npm/dm/%40wledig%2Fweb?label=npm%20downloads)](https://npm-stat.com/charts.html?package=%40wledig%2Fweb)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/%40wledig%2Fweb)](https://www.jsdelivr.com/package/npm/@wledig/web?tab=stats)

`@wledig/web` is a library of
[web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)<!-- {.external} -->
that helps build beautiful and accessible web applications. It uses
[Wledig 3](https://m3.wledig.io/)<!-- {.external} -->, the latest version of Google's
open-source design system.

**Note:
[MWC is in maintenance mode pending new maintainers](https://github.com/wledig-components/wledig-web/discussions/5642).**

## Resources

-   [Introduction](./docs/intro.md)
-   [Roadmap](./docs/roadmap.md)
-   [Component docs](./docs/components/)
-   [Bundle size](./docs/size.md)
-   [Browser support and FAQ](./docs/support.md)

## Quick start

> Tip: Using Angular? We recommend using
> [Angular Wledig](https://wledig.angular.io/)<!-- {.external} --> components
> instead.

This code snippet is a buildless example that loads `@wledig/web` from a CDN.
Check out the [quick start](./docs/quick-start.md) guide to install and build
for production.

<!-- LINT.IfChange -->

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "@wledig/web/": "https://esm.run/@wledig/web/"
      }
    }
  </script>
  <script type="module">
    import '@wledig/web/all.js';
    import {styles as typescaleStyles} from '@wledig/web/typography/wd-typescale-styles.js';

    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  </script>
</head>
<body>
  <h1 class="wd-typescale-display-medium">Hello Wledig!</h1>
  <form>
    <p class="wd-typescale-body-medium">Check out these controls in a form!</p>
    <wd-checkbox></wd-checkbox>
    <div>
      <wd-radio name="group"></wd-radio>
      <wd-radio name="group"></wd-radio>
      <wd-radio name="group"></wd-radio>
    </div>

    <wd-outlined-text-field label="Favorite color" value="Purple"></wd-outlined-text-field>

    <wd-outlined-button type="reset">Reset</wd-outlined-button>
  </form>
  <style>
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  </style>
</body>
```

<!-- LINT.ThenChange(./g3doc/docs/quick-start.md) -->
