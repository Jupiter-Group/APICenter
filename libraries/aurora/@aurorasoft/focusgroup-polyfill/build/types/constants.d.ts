export type DatasetName = string;
export namespace DatasetName {
    let INFERRED_ROLE: string;
    let ITEM: string;
    let AUTHOR_TABINDEX: string;
    let SEGMENT: string;
    let SEGMENT_START: string;
}
export type BehaviorToken = string;
export namespace BehaviorToken {
    let TOOLBAR: string;
    let TABLIST: string;
    let RADIOGROUP: string;
    let LISTBOX: string;
    let MENU: string;
    let MENUBAR: string;
    let NONE: string;
}
export const BEHAVIOR_TOKENS: string[];
/**
 * @typedef {Object} Behavior
 * @property {string} ownerRole
 * @property {(string|null)} childRole
 * @property {boolean} wrap
 * @property {("inline"|"block"|undefined)} axis
 */
/** @type {Record<BehaviorToken, Behavior>} */
export const BehaviorMap: Record<BehaviorToken, Behavior>;
export type Behavior = {
    ownerRole: string;
    childRole: (string | null);
    wrap: boolean;
    axis: ("inline" | "block" | undefined);
};
