/// <reference types="webdriver" />
import RunnableStats from './runnable';
import { WDIOReporterOptions } from '..';
export interface Runner {
    cid: string;
    specs: string[];
    config: WDIOReporterOptions;
    isMultiremote: boolean;
    sessionId?: string;
    capabilities: WebDriver.DesiredCapabilities;
    retry?: number;
    failures?: number;
    retries?: number;
}
export default class RunnerStats extends RunnableStats {
    cid: string;
    capabilities: WebDriver.DesiredCapabilities;
    sanitizedCapabilities: string;
    config: WDIOReporterOptions;
    specs: string[];
    sessionId?: string;
    isMultiremote: boolean;
    retry?: number;
    failures?: number;
    retries?: number;
    constructor(runner: Runner);
}
//# sourceMappingURL=runner.d.ts.map