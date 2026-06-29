export function createMutationObserver(callback: any): ShadowMutationObserver;
declare class ShadowMutationObserver {
    static #shadowObservers: Set<any>;
    static #overrideAttachShadow(win: any): void;
    constructor(callback: any);
    disconnect(): void;
    observe(target: any, options: any): void;
    takeRecords(): MutationRecord[];
    #private;
}
export {};
