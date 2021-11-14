"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerStats = exports.TestStats = exports.HookStats = exports.SuiteStats = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = require("fs-extra");
const events_1 = require("events");
const utils_1 = require("./utils");
const suite_1 = __importDefault(require("./stats/suite"));
exports.SuiteStats = suite_1.default;
const hook_1 = __importDefault(require("./stats/hook"));
exports.HookStats = hook_1.default;
const test_1 = __importDefault(require("./stats/test"));
exports.TestStats = test_1.default;
const runner_1 = __importDefault(require("./stats/runner"));
exports.RunnerStats = runner_1.default;
class WDIOReporter extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.failures = 0;
        this.suites = {};
        this.hooks = {};
        this.tests = {};
        this.currentSuites = [];
        this.counts = {
            suites: 0,
            tests: 0,
            hooks: 0,
            passes: 0,
            skipping: 0,
            failures: 0
        };
        this.retries = 0;
        this.isContentPresent = false;
        if (this.options.outputDir) {
            fs_extra_1.ensureDirSync(this.options.outputDir);
        }
        this.outputStream = this.options.stdout || !this.options.logFile
            ? this.options.writeStream
            : fs_extra_1.createWriteStream(this.options.logFile);
        let currentTest;
        const rootSuite = new suite_1.default({
            title: '(root)',
            fullTitle: '(root)',
        });
        this.currentSuites.push(rootSuite);
        this.on('client:beforeCommand', this.onBeforeCommand.bind(this));
        this.on('client:afterCommand', this.onAfterCommand.bind(this));
        this.on('runner:start', (runner) => {
            rootSuite.cid = runner.cid;
            this.runnerStat = new runner_1.default(runner);
            this.onRunnerStart(this.runnerStat);
        });
        this.on('suite:start', (params) => {
            const suite = new suite_1.default(params);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.suites.push(suite);
            this.currentSuites.push(suite);
            this.suites[suite.uid] = suite;
            this.onSuiteStart(suite);
        });
        this.on('hook:start', (hook) => {
            const hookStats = new hook_1.default(hook);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.hooks.push(hookStats);
            currentSuite.hooksAndTests.push(hookStats);
            this.hooks[hook.uid] = hookStats;
            this.onHookStart(hookStats);
        });
        this.on('hook:end', (hook) => {
            const hookStats = this.hooks[hook.uid];
            hookStats.complete(utils_1.getErrorsFromEvent(hook));
            this.counts.hooks++;
            this.onHookEnd(hookStats);
        });
        this.on('test:start', (test) => {
            test.retries = this.retries;
            currentTest = new test_1.default(test);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.tests.push(currentTest);
            currentSuite.hooksAndTests.push(currentTest);
            this.tests[test.uid] = currentTest;
            this.onTestStart(currentTest);
        });
        this.on('test:pass', (test) => {
            const testStat = this.tests[test.uid];
            testStat.pass();
            this.counts.passes++;
            this.counts.tests++;
            this.onTestPass(testStat);
        });
        this.on('test:fail', (test) => {
            const testStat = this.tests[test.uid];
            testStat.fail(utils_1.getErrorsFromEvent(test));
            this.counts.failures++;
            this.counts.tests++;
            this.onTestFail(testStat);
        });
        this.on('test:retry', (test) => {
            const testStat = this.tests[test.uid];
            testStat.fail(utils_1.getErrorsFromEvent(test));
            this.onTestRetry(testStat);
            this.retries++;
        });
        this.on('test:pending', (test) => {
            test.retries = this.retries;
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentTest = new test_1.default(test);
            if (test.uid in this.tests && this.tests[test.uid].state !== 'pending') {
                currentTest.uid = test.uid in this.tests ? 'skipped-' + this.counts.skipping : currentTest.uid;
            }
            const suiteTests = currentSuite.tests;
            if (!suiteTests.length || currentTest.uid !== suiteTests[suiteTests.length - 1].uid) {
                currentSuite.tests.push(currentTest);
                currentSuite.hooksAndTests.push(currentTest);
            }
            else {
                suiteTests[suiteTests.length - 1] = currentTest;
                currentSuite.hooksAndTests[currentSuite.hooksAndTests.length - 1] = currentTest;
            }
            this.tests[currentTest.uid] = currentTest;
            currentTest.skip(test.pendingReason);
            this.counts.skipping++;
            this.counts.tests++;
            this.onTestSkip(currentTest);
        });
        this.on('test:end', (test) => {
            const testStat = this.tests[test.uid];
            this.retries = 0;
            this.onTestEnd(testStat);
        });
        this.on('suite:end', (suite) => {
            const suiteStat = this.suites[suite.uid];
            suiteStat.complete();
            this.currentSuites.pop();
            this.onSuiteEnd(suiteStat);
        });
        this.on('runner:end', (runner) => {
            rootSuite.complete();
            if (this.runnerStat) {
                this.runnerStat.failures = runner.failures;
                this.runnerStat.retries = runner.retries;
                this.runnerStat.complete();
                this.onRunnerEnd(this.runnerStat);
            }
            const logFile = this.options.logFile;
            if (!this.isContentPresent && logFile && fs_1.default.existsSync(logFile)) {
                fs_1.default.unlinkSync(logFile);
            }
        });
        this.on('client:beforeCommand', (payload) => {
            if (!currentTest) {
                return;
            }
            currentTest.output.push(Object.assign(payload, { type: 'command' }));
        });
        this.on('client:afterCommand', (payload) => {
            if (!currentTest) {
                return;
            }
            currentTest.output.push(Object.assign(payload, { type: 'result' }));
        });
    }
    get isSynchronised() {
        return true;
    }
    write(content) {
        if (content) {
            this.isContentPresent = true;
        }
        this.outputStream.write(content);
    }
    onRunnerStart(runnerStats) { }
    onBeforeCommand(commandArgs) { }
    onAfterCommand(commandArgs) { }
    onSuiteStart(suiteStats) { }
    onHookStart(hookStat) { }
    onHookEnd(hookStats) { }
    onTestStart(testStats) { }
    onTestPass(testStats) { }
    onTestFail(testStats) { }
    onTestRetry(testStats) { }
    onTestSkip(testStats) { }
    onTestEnd(testStats) { }
    onSuiteEnd(suiteStats) { }
    onRunnerEnd(runnerStats) { }
}
exports.default = WDIOReporter;
