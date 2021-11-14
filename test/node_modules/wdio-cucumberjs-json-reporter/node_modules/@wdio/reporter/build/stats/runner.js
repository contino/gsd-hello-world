"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
const utils_1 = require("../utils");
class RunnerStats extends runnable_1.default {
    constructor(runner) {
        super('runner');
        this.cid = runner.cid;
        this.capabilities = runner.capabilities;
        this.sanitizedCapabilities = utils_1.sanitizeCaps(runner.capabilities);
        this.config = runner.config;
        this.specs = runner.specs;
        this.sessionId = runner.sessionId;
        this.isMultiremote = runner.isMultiremote;
        this.retry = runner.retry;
    }
}
exports.default = RunnerStats;
