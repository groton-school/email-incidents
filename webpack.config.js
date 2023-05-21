const path = require('path');
const fs = require('fs');

const config = require('@battis/webpack/ts/bookmarklet')({
  root: __dirname,
  title: 'Toggle IIQ Emails',
  package: require('./package.json'),
  externals: { jquery: '$' }
});

// for reverse compatibility, leave a copy of the build in root
config.plugins.push({
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
      fs.writeFile(
        path.resolve(__dirname, 'iiq-emails-source.js'),
        fs.readFileSync(path.resolve(__dirname, 'build', 'bookmarklet.js')),
        (err) => err && console.error(err)
      );
    });
  }
});

module.exports = config;
