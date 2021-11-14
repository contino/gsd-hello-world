import SeleniumStandaloneLauncher from './launcher';
import { SeleniumStandaloneOptions } from './types';
export default class SeleniumStandaloneService {
}
export declare const launcher: typeof SeleniumStandaloneLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        /**
         * property `args` also exists in Appium
         * ToDo(Christian): fine a better way to extend service options
         */
        interface ServiceOption extends Omit<SeleniumStandaloneOptions, 'args'> {
        }
    }
}
//# sourceMappingURL=index.d.ts.map