/// <reference types="node" />
import { EventEmitter } from 'events';
import { PickleFilter } from '@cucumber/cucumber';
import { Feature, Pickle, PickleStep, TestStep, TestStepResult } from '@cucumber/messages';
import CucumberEventListener from './cucumberEventListener';
import type { ReporterOptions } from './types';
import { ReporterScenario } from './constants';
declare class CucumberReporter {
    private _options;
    private _cid;
    private _specs;
    private _reporter;
    eventListener: CucumberEventListener;
    failedCount: number;
    private _tagsInTitle;
    private _scenarioLevelReport;
    private _featureStart?;
    private _scenarioStart?;
    private _testStart?;
    constructor(eventBroadcaster: EventEmitter, pickleFilter: PickleFilter, _options: ReporterOptions, _cid: string, _specs: string[], _reporter: EventEmitter);
    handleBeforeFeature(uri: string, feature: Feature): void;
    handleBeforeScenario(uri: string, feature: Feature, scenario: ReporterScenario): void;
    handleBeforeStep(uri: string, feature: Feature, scenario: Pickle, step: PickleStep | TestStep): void;
    handleAfterStep(uri: string, feature: Feature, scenario: Pickle, step: PickleStep | TestStep, result: TestStepResult): void;
    afterHook(uri: string, feature: Feature, scenario: Pickle, step: TestStep, result: TestStepResult): void;
    afterTest(uri: string, feature: Feature, scenario: Pickle, step: PickleStep, result: TestStepResult): void;
    handleAfterScenario(uri: string, feature: Feature, scenario: Pickle, result: TestStepResult): void;
    handleAfterFeature(uri: string, feature: Feature): void;
    emit(event: string, payload: any): void;
    getTitle(featureOrScenario: Feature | Pickle): string;
}
export default CucumberReporter;
//# sourceMappingURL=reporter.d.ts.map