"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeywordToStep = exports.getRule = exports.filterPickles = exports.setUserHookNames = exports.buildStepPayload = exports.getTestStepTitle = exports.getFeatureId = exports.getStepType = exports.formatMessage = exports.createStepArgument = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wdio/utils");
const logger_1 = __importDefault(require("@wdio/logger"));
const constants_1 = require("./constants");
const log = (0, logger_1.default)('@wdio/cucumber-framework:utils');
/**
 * NOTE: this function is exported for testing only
 */
function createStepArgument({ argument }) {
    var _a;
    if (!argument) {
        return undefined;
    }
    if (argument.dataTable) {
        return {
            rows: (_a = argument.dataTable.rows) === null || _a === void 0 ? void 0 : _a.map((row) => {
                var _a;
                return ({
                    cells: (_a = row.cells) === null || _a === void 0 ? void 0 : _a.map((cell) => cell.value)
                });
            })
        };
    }
    if (argument.docString) {
        return argument.docString.content;
    }
    return undefined;
}
exports.createStepArgument = createStepArgument;
/**
 * format message
 * @param {object} message { type: string, payload: object }
 */
function formatMessage({ payload = {} }) {
    let content = { ...payload };
    /**
     * need to convert Error to plain object, otherwise it is lost on process.send
     */
    if (payload.error && (payload.error.message || payload.error.stack)) {
        const { name, message, stack } = payload.error;
        content.error = { name, message, stack };
    }
    if (payload.title && payload.parent) {
        content.fullTitle = `${payload.parent}: ${payload.title}`;
    }
    return content;
}
exports.formatMessage = formatMessage;
var StepType;
(function (StepType) {
    StepType["hook"] = "hook";
    StepType["test"] = "test";
})(StepType || (StepType = {}));
/**
 * Get step type
 * @param {string} type `Step` or `Hook`
 */
function getStepType(step) {
    return step.hookId ? StepType.hook : StepType.test;
}
exports.getStepType = getStepType;
function getFeatureId(uri, feature) {
    var _a, _b;
    return `${path_1.default.basename(uri)}:${(_a = feature.location) === null || _a === void 0 ? void 0 : _a.line}:${(_b = feature.location) === null || _b === void 0 ? void 0 : _b.column}`;
}
exports.getFeatureId = getFeatureId;
/**
 * Builds test title from step keyword and text
 * @param {string} keyword
 * @param {string} text
 * @param {string} type
 */
function getTestStepTitle(keyword = '', text = '', type) {
    const title = (!text && type.toLowerCase() !== 'hook') ? 'Undefined Step' : text;
    return `${keyword.trim()} ${title.trim()}`.trim();
}
exports.getTestStepTitle = getTestStepTitle;
/**
 * build payload for test/hook event
 */
function buildStepPayload(uri, feature, scenario, step, params) {
    return {
        ...params,
        uid: step.id,
        // @ts-ignore
        title: getTestStepTitle(step.keyword, step.text, params.type),
        parent: scenario.id,
        argument: createStepArgument(step),
        file: uri,
        tags: scenario.tags,
        featureName: feature.name,
        scenarioName: scenario.name,
    };
}
exports.buildStepPayload = buildStepPayload;
/**
 * wrap every user defined hook with function named `userHookFn`
 * to identify later on is function a step, user hook or wdio hook.
 * @param {object} options `Cucumber.supportCodeLibraryBuilder.options`
 */
function setUserHookNames(options) {
    constants_1.CUCUMBER_HOOK_DEFINITION_TYPES.forEach(hookName => {
        options[hookName].forEach((testRunHookDefinition) => {
            const hookFn = testRunHookDefinition.code;
            if (!hookFn.name.startsWith('wdioHook')) {
                const userHookAsyncFn = async function (...args) {
                    return hookFn.apply(this, args);
                };
                const userHookFn = function (...args) {
                    return hookFn.apply(this, args);
                };
                testRunHookDefinition.code = ((0, utils_1.isFunctionAsync)(hookFn)) ? userHookAsyncFn : userHookFn;
            }
        });
    });
}
exports.setUserHookNames = setUserHookNames;
/**
 * Returns true/false if testCase should be kept for current capabilities
 * according to tag in the syntax  @skip([conditions])
 * For example "@skip(browserName=firefox)" or "@skip(browserName=chrome,platform=/.+n?x/)"
 * @param {*} testCase
 */
function filterPickles(capabilities, pickle) {
    const skipTag = /^@skip\((.*)\)$/;
    const match = (value, expr) => {
        if (Array.isArray(expr)) {
            return expr.indexOf(value) >= 0;
        }
        else if (expr instanceof RegExp) {
            return expr.test(value);
        }
        return (expr && ('' + expr).toLowerCase()) === (value && ('' + value).toLowerCase());
    };
    const parse = (skipExpr) => skipExpr.split(';').reduce((acc, splitItem) => {
        const pos = splitItem.indexOf('=');
        if (pos > 0) {
            try {
                acc[splitItem.substring(0, pos)] = eval(splitItem.substring(pos + 1));
            }
            catch (err) {
                log.error(`Couldn't use tag "${splitItem}" for filtering because it is malformed`);
            }
        }
        return acc;
    }, {});
    return !(pickle && pickle.tags && pickle.tags
        .map(p => { var _a; return (_a = p.name) === null || _a === void 0 ? void 0 : _a.match(skipTag); })
        .filter(Boolean)
        .map(m => parse(m[1]))
        .find((filter) => Object.keys(filter)
        .every((key) => match(capabilities[key], filter[key]))));
}
exports.filterPickles = filterPickles;
/**
 * The reporters need to have the rule.
 * They are NOT available on the scenario, they ARE on the feature.
 * This will add them to it
 */
function getRule(feature, scenarioId) {
    var _a, _b;
    const rules = (_a = feature.children) === null || _a === void 0 ? void 0 : _a.filter((child) => Object.keys(child)[0] === 'rule');
    const rule = rules.find((rule) => {
        var _a, _b;
        let scenarioRule = (_b = (_a = rule.rule) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.find((child) => { var _a; return ((_a = child.scenario) === null || _a === void 0 ? void 0 : _a.id) === scenarioId; });
        if (scenarioRule) {
            return rule;
        }
    });
    return (_b = rule === null || rule === void 0 ? void 0 : rule.rule) === null || _b === void 0 ? void 0 : _b.name;
}
exports.getRule = getRule;
/**
 * The reporters need to have the keywords, like `Given|When|Then`. They are NOT available
 * on the scenario, they ARE on the feature.
 * This will aad them
 */
function addKeywordToStep(steps, feature) {
    return steps.map(step => {
        // Steps without a astNodeIds are hooks
        if (step.astNodeIds && step.astNodeIds.length > 0 && feature.children) {
            // Points to the AST node locations of the pickle. The last one represents the unique id of the pickle.
            // A pickle constructed from Examples will have the first id originating from the Scenario AST node, and
            // the second from the TableRow AST node.
            // See https://github.com/cucumber/cucumber/blob/master/messages/messages.md
            const astNodeId = step.astNodeIds[0];
            const rules = feature.children.filter((child) => Object.keys(child)[0] === 'rule');
            let featureChildren = feature.children.filter((child) => Object.keys(child)[0] !== 'rule');
            const rulesChildrens = rules.map((child) => { var _a; return (_a = child.rule) === null || _a === void 0 ? void 0 : _a.children; }).flat();
            featureChildren = featureChildren.concat(rulesChildrens);
            featureChildren.find((child) => 
            // @ts-ignore
            child[Object.keys(child)[0]].steps.find((featureScenarioStep) => {
                if (featureScenarioStep.id === astNodeId.toString()) {
                    step.keyword = featureScenarioStep.keyword;
                }
                return;
            }));
            return step;
        }
        return step;
    });
}
exports.addKeywordToStep = addKeywordToStep;
