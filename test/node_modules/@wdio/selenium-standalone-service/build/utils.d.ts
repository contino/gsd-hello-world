import { Capabilities } from '@wdio/types';
/**
 * Resolves the given path into a absolute path and appends the default filename as fallback when the provided path is a directory.
 * @param  {String} filePath         relative file or directory path
 * @param  {String} defaultFilename default file name when filePath is a directory
 * @return {String}                 absolute file path
 */
export declare function getFilePath(filePath: string, defaultFilename: string): string;
/**
 * find whether a browser session could be supported by the selenium-standalone service
 * @param   {Capabilities.Capabilities} capabilities capabilities used for the session
 * @returns {Boolean}                                true, if capabilities suggest a supported platform
 */
export declare function hasCapsWithSupportedBrowser(capabilities: Capabilities.Capabilities): boolean;
//# sourceMappingURL=utils.d.ts.map