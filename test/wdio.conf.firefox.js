const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

// have main config file as default but overwrite environment specific information
exports.config = merge(
  wdioConf.config, {
    capabilities: [{

        maxInstances: 5,

        browserName: 'firefox',
        'moz:firefoxOptions': {
          // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
          args: ['--headless']
        },
        acceptInsecureCerts: true,
    }],
    services: [
      ['selenium-standalone'],
      ['firefox-profile', {
          // Profiles encapsulate proxy information
          profileDirectory: '/app/profile/hmey3el8.seluser',
          legacy: false
      }]
    ]
}, { clone: false })
