"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorsFromEvent = exports.sanitizeCaps = exports.sanitizeString = void 0;
function sanitizeString(str) {
    if (!str) {
        return '';
    }
    return String(str)
        .replace(/^.*\/([^/]+)\/?$/, '$1')
        .replace(/\./g, '_')
        .replace(/\s/g, '')
        .toLowerCase();
}
exports.sanitizeString = sanitizeString;
function sanitizeCaps(caps) {
    if (!caps) {
        return '';
    }
    let result;
    if (caps.deviceName) {
        result = [
            sanitizeString(caps.deviceName),
            sanitizeString(caps.platformName),
            sanitizeString(caps.platformVersion),
            sanitizeString(caps.app)
        ];
    }
    else {
        result = [
            sanitizeString(caps.browserName),
            sanitizeString(caps.version || caps.browserVersion),
            sanitizeString(caps.platform || caps.platformName),
            sanitizeString(caps.app)
        ];
    }
    result = result.filter(n => n !== undefined && n !== '');
    return result.join('.');
}
exports.sanitizeCaps = sanitizeCaps;
function getErrorsFromEvent(e) {
    if (e.errors)
        return e.errors;
    if (e.error)
        return [e.error];
    return [];
}
exports.getErrorsFromEvent = getErrorsFromEvent;
