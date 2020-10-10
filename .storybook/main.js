const path = require('path');
const webpack = require('webpack')
const { execSync } = require('child_process')
const gitMsg = execSync("git config --list", { encoding: "utf-8" });
const userMsg = gitMsg.split("\n").reduce((acc, cur) => {
  if (cur.indexOf("=") > -1) {
    const [key, value] = cur.match(/[^=]+/g);
    acc[key] = value;
  }
  return acc;
}, {});

module.exports = {
  stories: ['../stories/**/*.stories.js[x]', '../stories/**/*.stories.mdx'],
  webpackFinal(config) {
    config.resolve.alias['@'] = path.join(__dirname, '../src')
    config.module.rules.push({
      test: /\.scss$/i,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    })
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        AUTH: userMsg['user.name'] === 'Pisco'
      }
    }))
    return config
  },
  addons: [
    '@storybook/addon-docs',
  ]
};
