import { Hook } from './hook';
import { Suite } from './suite';
import { Test } from './test';
export default abstract class RunnableStats {
    type: string;
    start: Date;
    end?: Date;
    _duration: number;
    constructor(type: string);
    complete(): void;
    get duration(): number;
    static getIdentifier(runner: Hook | Suite | Test): string;
}
//# sourceMappingURL=runnable.d.ts.map