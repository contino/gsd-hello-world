import BrowserstackLauncher from './launcher';
import BrowserstackService from './service';
import type { BrowserstackConfig } from './types';
export default BrowserstackService;
export declare const launcher: typeof BrowserstackLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends BrowserstackConfig {
        }
    }
}
//# sourceMappingURL=index.d.ts.map