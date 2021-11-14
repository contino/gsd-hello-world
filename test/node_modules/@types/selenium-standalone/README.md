# Installation
> `npm install --save @types/selenium-standalone`

# Summary
This package contains type definitions for selenium-standalone (https://github.com/vvo/selenium-standalone).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/selenium-standalone.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/selenium-standalone/index.d.ts)
````ts
// Type definitions for selenium-standalone 7.0
// Project: https://github.com/vvo/selenium-standalone
// Definitions by: Sander de Waal <https://github.com/SanderDeWaal1992>
//                 Mykola Grybyk <https://github.com/mgrybyk>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import * as http from "http";
import { URL } from "url";
import { ChildProcess, SpawnOptions } from "child_process";

export function install(opts?: InstallOpts): Promise<void>;

export function start(opts?: StartOpts): Promise<ChildProcess>;

export interface InstallOpts {
    baseURL?: string | undefined;
    basePath?: string | undefined;
    version?: string | undefined;
    drivers?: {
        [browser: string]: DriverOptions
    } | undefined;
    progressCb?: ((totalLength: number, progressLength: number, chunkLength: number) => void) | undefined;
    logger?: ((message: string) => void) | undefined;
    requestOpts?: http.RequestOptions | string | URL | undefined;
}

export interface StartOpts {
    basePath?: string | undefined;
    version?: string | undefined;
    drivers?: {
        [browser: string]: DriverOptions
    } | undefined;
    seleniumArgs?: string[] | undefined;
    javaArgs?: string[] | undefined;
    spawnOptions?: SpawnOptions | undefined;
    javaPath?: string | undefined;
    requestOpts?: http.RequestOptions | string | URL | undefined;
}

export interface DriverOptions {
    version?: string | undefined;
    arch?: string | "ia32" | "x64" | undefined;
    baseURL?: string | undefined;
}

export interface FsPaths {
    [x: string]: any;
    chrome?: {
        [x: string]: any;
        installPath: string;
    } | undefined;
    ie?: {
        [x: string]: any;
        installPath: string;
    } | undefined;
    edge?: {
        [x: string]: any;
        installPath: string;
    } | undefined;
    firefox?: {
        [x: string]: any;
        installPath: string;
    } | undefined;
    selenium?: {
        [x: string]: any;
        installPath: string;
    } | undefined;
}

export { ChildProcess, SpawnOptions } from "child_process";

````

### Additional Details
 * Last updated: Tue, 06 Jul 2021 16:34:29 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)
 * Global values: none

# Credits
These definitions were written by [Sander de Waal](https://github.com/SanderDeWaal1992), and [Mykola Grybyk](https://github.com/mgrybyk).
