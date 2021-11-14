"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fileExists;

var _fsExtra = require("fs-extra");

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    (0, _fsExtra.accessSync)(filePath);
    return true;
  } catch (err) {
    return false;
  }
}