import { CucumberOptions } from './types';
import { Pickle, PickleStep } from '@cucumber/messages';
export declare const DEFAULT_TIMEOUT = 60000;
export declare const DEFAULT_OPTS: CucumberOptions;
export declare const NOOP: () => void;
export declare const CUCUMBER_HOOK_DEFINITION_TYPES: readonly ["beforeTestRunHookDefinitionConfigs", "beforeTestCaseHookDefinitionConfigs", "afterTestCaseHookDefinitionConfigs", "afterTestRunHookDefinitionConfigs"];
/**
 * The pickle step needs to have a keyword for the reporters, otherwise reporters like
 * the allure or spec reporter won't show the `Given|When|Then` words
 */
export interface ReporterStep extends PickleStep {
    keyword?: string;
}
/**
 * The pickle scenario needs to have a rule for the reporters, otherwise reporters like
 * the allure or spec reporter won't show the rule
 */
export interface ReporterScenario extends Pickle {
    rule?: string;
}
//# sourceMappingURL=constants.d.ts.map