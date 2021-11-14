const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')
// have main config file as default but overwrite environment specific information

const drivers = {
  chrome: { version: '91.0.4472.101' }, // https://chromedriver.chromium.org/
}

exports.config = merge(
  wdioConf.config,
  {
    services: [
      [
        'selenium-standalone',
        {
          installArgs: { drivers }, // drivers to install
          args: { drivers }, // drivers to use
        },
      ],
    ],
    capabilities: [
      {
        'maxInstances': 5,
        'browserName': 'chrome',
        'acceptInsecureCerts': true,
        'goog:loggingPrefs': { driver: 'WARNING', browser: 'INFO' },
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--disable-infobars',
            ...process.env.HEADLESS ? ['--headless'] : [],
            '--disable-gpu',
            '--window-size=1440,735',
          ],
        },
        // proxy: {
        //   proxyType: "manual",
        //   httpProxy: "http://myproxy:80",
        //   sslProxy: "http://myproxy:443",
        //   noProxy: "localhost,127.0.0.1"
        // }
      },
    ],
  },
  { clone: false }
)
