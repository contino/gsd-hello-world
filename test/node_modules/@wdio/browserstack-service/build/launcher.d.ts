import * as BrowserstackLocalLauncher from 'browserstack-local';
import type { Capabilities, Services, Options } from '@wdio/types';
import { BrowserstackConfig } from './types';
declare type BrowserstackLocal = BrowserstackLocalLauncher.Local & {
    pid?: number;
    stop(callback: (err?: any) => void): void;
};
export default class BrowserstackLauncherService implements Services.ServiceInstance {
    private _options;
    private _config;
    browserstackLocal?: BrowserstackLocal;
    constructor(_options: BrowserstackConfig, capabilities: Capabilities.RemoteCapability, _config: Options.Testrunner);
    onPrepare(config?: Options.Testrunner, capabilities?: Capabilities.RemoteCapabilities): void | Promise<unknown>;
    onComplete(): true | Promise<unknown> | undefined;
}
export {};
//# sourceMappingURL=launcher.d.ts.map