import type { Capabilities } from '@wdio/types';
import { FirefoxProfileOptions } from './types';
export default class FirefoxProfileLauncher {
    private _options;
    private _profile?;
    constructor(_options: FirefoxProfileOptions);
    onPrepare(config: never, capabilities: Capabilities.RemoteCapabilities): Promise<void>;
    /**
     * Sets any preferences and proxy
     */
    _setPreferences(): void;
    _buildExtension(capabilities: Capabilities.RemoteCapabilities): Promise<void>;
    _setProfile(capability: Capabilities.Capabilities, zippedProfile: string): void;
}
//# sourceMappingURL=launcher.d.ts.map