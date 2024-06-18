'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// const { Webpack } = require('@embroider/compat');
const fileLoaderConfig = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader'
    }
  ]
};

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-phone-input'],
      webpack: {
        module: {
          rules: [fileLoaderConfig]
        }
      }
    }
  });

  // const { maybeEmbroider } = require('@embroider/test-setup');
  // return maybeEmbroider(app, {
  //   packagerOptions: {
  //     webpackConfig: {
  //       module: {
  //         rules: [fileLoaderConfig]
  //       }
  //     }
  //   }
  // });
  return app.toTree();
};
