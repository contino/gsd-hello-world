"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firefox_profile_1 = __importDefault(require("firefox-profile"));
const util_1 = require("util");
class FirefoxProfileLauncher {
    constructor(_options) {
        this._options = _options;
    }
    async onPrepare(config, capabilities) {
        /**
         * Return if no profile options were specified
         */
        if (Object.keys(this._options).length === 0) {
            return;
        }
        if (this._options.profileDirectory) {
            this._profile = await (0, util_1.promisify)(firefox_profile_1.default.copy)(this._options.profileDirectory);
        }
        else {
            this._profile = new firefox_profile_1.default();
        }
        if (!this._profile) {
            return;
        }
        // Set preferences and proxy
        this._setPreferences();
        if (!Array.isArray(this._options.extensions)) {
            return this._buildExtension(capabilities);
        }
        // Add the extension
        await (0, util_1.promisify)(this._profile.addExtensions.bind(this._profile))(this._options.extensions);
        return this._buildExtension(capabilities);
    }
    /**
     * Sets any preferences and proxy
     */
    _setPreferences() {
        if (!this._profile) {
            return;
        }
        for (const [preference, value] of Object.entries(this._options)) {
            if (['extensions', 'proxy', 'legacy', 'profileDirectory'].includes(preference)) {
                continue;
            }
            this._profile.setPreference(preference, value);
        }
        if (this._options.proxy) {
            this._profile.setProxy(this._options.proxy);
        }
        this._profile.updatePreferences();
    }
    async _buildExtension(capabilities) {
        if (!this._profile) {
            return;
        }
        const zippedProfile = await (0, util_1.promisify)(this._profile.encoded.bind(this._profile))();
        if (Array.isArray(capabilities)) {
            capabilities
                .filter((capability) => capability.browserName === 'firefox')
                .forEach((capability) => {
                this._setProfile(capability, zippedProfile);
            });
            return;
        }
        for (const browser in capabilities) {
            const capability = capabilities[browser].capabilities;
            if (!capability || capability.browserName !== 'firefox') {
                continue;
            }
            this._setProfile(capability, zippedProfile);
        }
    }
    _setProfile(capability, zippedProfile) {
        if (this._options.legacy) {
            // for older firefox and geckodriver versions
            capability.firefox_profile = zippedProfile;
        }
        else {
            // for firefox >= 56.0 and geckodriver >= 0.19.0
            capability['moz:firefoxOptions'] = capability['moz:firefoxOptions'] || {};
            capability['moz:firefoxOptions'].profile = zippedProfile;
        }
    }
}
exports.default = FirefoxProfileLauncher;
