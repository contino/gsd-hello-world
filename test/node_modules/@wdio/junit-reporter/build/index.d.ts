import WDIOReporter, { RunnerStats, TestStats } from '@wdio/reporter';
import type { JUnitReporterOptions } from './types';
/**
 * Reporter that converts test results from a single instance/runner into an XML JUnit report. This class
 * uses junit-report-builder (https://github.com/davidparsson/junit-report-builder) to build report.The report
 * generated from this reporter should conform to the standard JUnit report schema
 * (https://github.com/junit-team/junit5/blob/master/platform-tests/src/test/resources/jenkins-junit.xsd).
 */
declare class JunitReporter extends WDIOReporter {
    options: JUnitReporterOptions;
    private _suiteNameRegEx;
    private _packageName?;
    private _suiteTitleLabel?;
    private _fileNameLabel?;
    private _activeFeature?;
    private _activeFeatureName?;
    constructor(options: JUnitReporterOptions);
    onTestRetry(testStats: TestStats): void;
    onRunnerEnd(runner: RunnerStats): void;
    private _prepareName;
    private _addFailedHooks;
    private _addCucumberFeatureToBuilder;
    private _addSuiteToBuilder;
    private _buildJunitXml;
    private _buildOrderedReport;
    private _getStandardOutput;
    private _format;
}
export default JunitReporter;
//# sourceMappingURL=index.d.ts.map