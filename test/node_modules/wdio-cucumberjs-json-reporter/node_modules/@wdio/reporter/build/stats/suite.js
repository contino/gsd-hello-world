"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
class SuiteStats extends runnable_1.default {
    constructor(suite) {
        super(suite.type || 'suite');
        this.tests = [];
        this.hooks = [];
        this.suites = [];
        this.hooksAndTests = [];
        this.uid = runnable_1.default.getIdentifier(suite);
        this.cid = suite.cid;
        this.title = suite.title;
        this.fullTitle = suite.fullTitle;
        this.tags = suite.tags;
        this.description = suite.description;
    }
}
exports.default = SuiteStats;
