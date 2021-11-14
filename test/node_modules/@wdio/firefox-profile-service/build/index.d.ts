import FirefoxProfileLauncher from './launcher';
import type { FirefoxProfileOptions } from './types';
export declare const launcher: typeof FirefoxProfileLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends FirefoxProfileOptions {
        }
    }
}
//# sourceMappingURL=index.d.ts.map