import { Tag } from '../types';
import HookStats from './hook';
import RunnableStats from './runnable';
import TestStats from './test';
export interface Suite {
    type?: string;
    title: string;
    parent?: string;
    fullTitle: string;
    pending?: boolean;
    fil?: string;
    duration?: number;
    cid?: string;
    specs?: string[];
    uid?: string;
    tags?: string[] | Tag[];
    description?: string;
}
export default class SuiteStats extends RunnableStats {
    uid: string;
    cid?: string;
    title: string;
    fullTitle: string;
    tags?: string[] | Tag[];
    tests: TestStats[];
    hooks: HookStats[];
    suites: SuiteStats[];
    hooksAndTests: (HookStats | TestStats)[];
    description?: string;
    constructor(suite: Suite);
}
//# sourceMappingURL=suite.d.ts.map