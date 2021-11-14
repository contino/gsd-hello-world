"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCapsWithSupportedBrowser = exports.getFilePath = void 0;
const path_1 = __importDefault(require("path"));
const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i;
const SUPPORTED_CAPABILITIES = [
    'chrome',
    'googlechrome',
    'firefox',
    'edge',
    'msedge',
    'microsoftedge',
    'microsoft edge',
    'safari',
    'webkit'
];
/**
 * Resolves the given path into a absolute path and appends the default filename as fallback when the provided path is a directory.
 * @param  {String} filePath         relative file or directory path
 * @param  {String} defaultFilename default file name when filePath is a directory
 * @return {String}                 absolute file path
 */
function getFilePath(filePath, defaultFilename) {
    let absolutePath = path_1.default.resolve(filePath);
    // test if we already have a file (e.g. selenium.txt, .log, log.txt, etc.)
    // NOTE: path.extname doesn't work to detect a file, cause dotfiles are reported by node to have no extension
    if (!FILE_EXTENSION_REGEX.test(path_1.default.basename(absolutePath))) {
        absolutePath = path_1.default.join(absolutePath, defaultFilename);
    }
    return absolutePath;
}
exports.getFilePath = getFilePath;
/**
 * find whether a browser session could be supported by the selenium-standalone service
 * @param   {Capabilities.Capabilities} capabilities capabilities used for the session
 * @returns {Boolean}                                true, if capabilities suggest a supported platform
 */
function hasCapsWithSupportedBrowser(capabilities) {
    var _a;
    if (!capabilities.browserName) {
        return false;
    }
    return SUPPORTED_CAPABILITIES.includes((_a = capabilities.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase());
}
exports.hasCapsWithSupportedBrowser = hasCapsWithSupportedBrowser;
