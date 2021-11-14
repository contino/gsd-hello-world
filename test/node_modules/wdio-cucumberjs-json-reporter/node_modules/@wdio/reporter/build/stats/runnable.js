"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunnableStats {
    constructor(type) {
        this.type = type;
        this.start = new Date();
        this._duration = 0;
    }
    complete() {
        this.end = new Date();
        this._duration = this.end.getTime() - this.start.getTime();
    }
    get duration() {
        if (this.end) {
            return this._duration;
        }
        return new Date().getTime() - this.start.getTime();
    }
    static getIdentifier(runner) {
        return runner.uid || runner.title;
    }
}
exports.default = RunnableStats;
