<h1 align="center">Scss Vars Loader</h1>
<h3 align="center">Import Scss vars from Webpack config or from JS/JSON files</h3>
<p align="center">
  <!-- <a target="_blank" href="https://travis-ci.org/epegzz/sass-vars-loader">
    <img alt="Travis" src="https://img.shields.io/travis/epegzz/sass-vars-loader.svg?style=flat-square">
  </a> -->
  <!-- <a target="_blank" href="https://codeclimate.com/github/epegzz/sass-vars-loader/maintainability">
    <img alt="Maintainability" src="https://img.shields.io/codeclimate/maintainability/epegzz/sass-vars-loader.svg?style=flat-square">
  </a> -->
  <a target="_blank" href="https://github.com/shijinyu/scss-vars-loader/stargazers">
    <img alt="github Star" src="https://img.shields.io/github/stars/shijinyu/scss-vars-loader.svg">
  </a>
  <a target="_blank" href="https://github.com/shijinyu/scss-vars-loader/issues">
    <img alt="open issues" src="https://img.shields.io/github/issues/shijinyu/scss-vars-loader.svg">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/shijinyu/scss-vars-loader">
    <img alt="npm version" src="https://img.shields.io/npm/v/scss-vars-loader.svg">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/shijinyu/scss-vars-loader">
    <img alt="npm installs" src="https://img.shields.io/npm/dw/scss-vars-loader.svg">
  </a>
  <a target="_blank" href="https://github.com/shijinyu/scss-vars-loader/blob/master/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/github/license/shijinyu/scss-vars-loader.svg">
  </a>
</p>





##### This loader allows you to use Sass variables defined in:

<li>✅ JSON Files</li>
<li>✅ JavaScript Files</li>
<li>✅ Inlined in Webpack Config</li>
<li>✅ Map Props for Every Variable</li>



##### Supports ONLY SCSS types:

<li>✅ SCSS Syntax</li>
<li>❌ SASS Syntax</li>


##### Supports hot reload:

<li>✅ HMR Enabled</li>

<br/>

## Install

using npm
```sh
npm install scss-vars-loader --save-dev
```
using yarn
```sh
yarn add scss-vars-loader --dev
```


## Usage

Look at the [Example Webpack Config File](./example/webpack.config.js) to see how to use this
loader in conjunction with [style-loader](https://github.com/webpack-contrib/style-loader) and
[css-loader](https://github.com/webpack-contrib/css-loader)

### Option 1: Inline Sass vars in the webpack config

```scss
// styles.css:

.some-class {
  background: $greenFromWebpackConfig;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "scss-vars-loader", options: {
          syntax: 'scss',
          // Option 1) Specify vars here
          vars: {
            greenFromWebpackConfig: '#0f0'
          },
          props: {
            pathFromJS: {
              asValue: true,
              asDefault: true
            }
          }
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### Option 2: Load Sass vars from JSON file

```js
// config/sassVars.json

{
  "purpleFromJSON": "purple"
}
```

```scss
// styles.css:

.some-class {
  background: $purpleFromJSON;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "@epegzz/sass-vars-loader", options: {
          syntax: 'scss',
          files: [
            // Option 2) Load vars from JSON file
            path.resolve(__dirname, 'config/sassVars.json')
          ]
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


### Option 3: Load Sass vars from JavaScript file

```js
// config/sassVars.js

module.exports = {
  blueFromJavaScript: 'blue'
};
```

```scss
// styles.css:

.some-class {
  background: $blueFromJavaScript;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "@epegzz/sass-vars-loader", options: {
          syntax: 'scss',
          files: [
            // Option 3) Load vars from JavaScript file
            path.resolve(__dirname, 'config/sassVars.js')
          ]
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


### Pro Tip: Using objects as Sass vars!

Use [map_get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
in order to use objects as Sass vars:

```js
// config/sassVars.js

module.exports = {
  lightTheme: {
    background: 'white',
    color: 'black'
  },
  darkTheme: {
    background: 'black',
    color: 'gray'
  }
};
```

```scss
// styles.css:

$theme: $lightTheme;

.some-class {
  background: map_get($theme, background);
  color: map_get($theme, color);
}
```
