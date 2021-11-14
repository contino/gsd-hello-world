"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mode = require('./web').default;
if (typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node') {
    const nodeMode = './node';
    mode = require(nodeMode).default;
}
exports.default = mode;
