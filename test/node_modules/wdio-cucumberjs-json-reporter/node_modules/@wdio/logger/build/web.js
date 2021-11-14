"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOG_METHODS = ['error', 'warn', 'info', 'debug', 'trace', 'silent'];
function getLogger(component) {
    return LOG_METHODS.reduce((acc, cur) => {
        const prop = cur;
        if (console[prop]) {
            acc[prop] = console[prop].bind(console, `${component}:`);
        }
        return acc;
    }, {});
}
exports.default = getLogger;
getLogger.setLevel = () => { };
getLogger.setLogLevelsConfig = () => { };
getLogger.waitForBuffer = () => { };
getLogger.clearLogger = () => { };
