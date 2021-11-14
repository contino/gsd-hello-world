import { supportCodeLibraryBuilder } from '@cucumber/cucumber';
import { PickleStep, TestStep, Feature, Pickle, TestStepResultStatus } from '@cucumber/messages';
import { Capabilities } from '@wdio/types';
import { ReporterStep } from './constants';
/**
 * NOTE: this function is exported for testing only
 */
export declare function createStepArgument({ argument }: PickleStep): string | {
    rows: {
        cells: string[];
    }[];
} | undefined;
/**
 * format message
 * @param {object} message { type: string, payload: object }
 */
export declare function formatMessage({ payload }: any): any;
declare enum StepType {
    hook = "hook",
    test = "test"
}
/**
 * Get step type
 * @param {string} type `Step` or `Hook`
 */
export declare function getStepType(step: TestStep): StepType;
export declare function getFeatureId(uri: string, feature: Feature): string;
/**
 * Builds test title from step keyword and text
 * @param {string} keyword
 * @param {string} text
 * @param {string} type
 */
export declare function getTestStepTitle(keyword: string | undefined, text: string | undefined, type: string): string;
/**
 * build payload for test/hook event
 */
export declare function buildStepPayload(uri: string, feature: Feature, scenario: Pickle, step: ReporterStep, params: {
    type: string;
    state?: TestStepResultStatus | string | null;
    error?: Error;
    duration?: number;
    title?: string | null;
    passed?: boolean;
    file?: string;
}): {
    uid: string;
    title: string;
    parent: string;
    argument: string | {
        rows: {
            cells: string[];
        }[];
    } | undefined;
    file: string;
    tags: readonly import("@cucumber/messages").PickleTag[];
    featureName: string;
    scenarioName: string;
    type: string;
    state?: string | null | undefined;
    error?: Error | undefined;
    duration?: number | undefined;
    passed?: boolean | undefined;
};
/**
 * wrap every user defined hook with function named `userHookFn`
 * to identify later on is function a step, user hook or wdio hook.
 * @param {object} options `Cucumber.supportCodeLibraryBuilder.options`
 */
export declare function setUserHookNames(options: typeof supportCodeLibraryBuilder): void;
/**
 * Returns true/false if testCase should be kept for current capabilities
 * according to tag in the syntax  @skip([conditions])
 * For example "@skip(browserName=firefox)" or "@skip(browserName=chrome,platform=/.+n?x/)"
 * @param {*} testCase
 */
export declare function filterPickles(capabilities: Capabilities.RemoteCapability, pickle?: Pickle): boolean;
/**
 * The reporters need to have the rule.
 * They are NOT available on the scenario, they ARE on the feature.
 * This will add them to it
 */
export declare function getRule(feature: Feature, scenarioId: string): string | undefined;
/**
 * The reporters need to have the keywords, like `Given|When|Then`. They are NOT available
 * on the scenario, they ARE on the feature.
 * This will aad them
 */
export declare function addKeywordToStep(steps: ReporterStep[], feature: Feature): ReporterStep[];
export {};
//# sourceMappingURL=utils.d.ts.map