require('global-agent/bootstrap')
const merge = require('deepmerge')
const { __EnumValue } = require('graphql')
const wdioConf = require('./wdio.conf.js')
// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  services: [
    [
      'browserstack',
      {
        browserstackLocal: true,
        'browserstack.networkLogsOptions': { captureContent: 'true'},
        opts: {
          // proxyHost: 'myproxy',
          // proxyPort: 80,
          forcelocal: false,
          // only: 'localhost,8080,1'
        }
      },
    ],
  ],

  capabilities: [
    {
      'bstack:options': {
        os: 'Windows',
        osVersion: '10',
        local: 'true',
        debug: 'true',
        seleniumVersion: '3.5.2',
        projectName: 'Win10-Edge',
        networkLogs: 'true',
        consoleLogs: 'verbose',
        idleTimeout: '500',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      'browserName': 'Edge',
      'browserVersion': 'latest',
      'acceptInsecureCerts': true,      
    },
    {
      'bstack:options': {
        os: 'Windows',
        osVersion: '10',
        local: 'true',
        debug: 'true',
        seleniumVersion: '3.5.2',
        projectName: 'Win10-Chrome',
        networkLogs: 'true',
        consoleLogs: 'verbose',
        idleTimeout: '500',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'acceptInsecureCerts': true,
    },
    {
      'bstack:options': {
        os: 'OS X',
        osVersion: 'Catalina',
        local: 'true',
        debug: 'true',
        seleniumVersion: '3.14.0',
        projectName: 'OSX-Chrome',
        networkLogs: 'true',
        consoleLogs: 'verbose',
        idleTimeout: '500',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'acceptInsecureCerts': true,
    },
    {
      'bstack:options': {
        os: 'OS X',
        osVersion: 'Catalina',
        local: 'true',
        debug: 'true',
        seleniumVersion: '3.141.59',
        projectName: 'OSX-Safari',
        networkLogs: 'true',
        consoleLogs: 'verbose',
        idleTimeout: '500',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      'browserName': 'Safari',
      'browserVersion': '13.0',
      'acceptInsecureCerts': true,
    },
  ],
})
