"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
class TestStats extends runnable_1.default {
    constructor(test) {
        super('test');
        this.uid = runnable_1.default.getIdentifier(test);
        this.cid = test.cid;
        this.title = test.title;
        this.fullTitle = test.fullTitle;
        this.output = [];
        this.argument = test.argument;
        this.retries = test.retries;
        this.state = 'pending';
    }
    pass() {
        this.complete();
        this.state = 'passed';
    }
    skip(reason) {
        this.pendingReason = reason;
        this.state = 'skipped';
    }
    fail(errors) {
        this.complete();
        this.state = 'failed';
        this.errors = errors;
        if (errors && errors.length) {
            this.error = errors[0];
        }
    }
}
exports.default = TestStats;
