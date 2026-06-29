/**
 * Whether the current user agent has the `document` global object.
 *
 * @returns {boolean}
 */
export function hasDocument(): boolean;
/**
 * Whether the current user agent supports focusgroup.
 *
 * @returns {boolean}
 */
export function supportsFocusGroup(): boolean;
/**
 * @typedef {Object} FocusGroupDefinition
 * @property {BehaviorToken} [behavior]
 * @property {boolean} [wrap]
 * @property {("inline"|"block"|undefined)} [axis]
 * @property {boolean} [memory]
 */
/**
 * Parse a `FocusGroupDefinition` from the owner element's `focusgroup`
 * attribute according to the HTML focusgroup spec. Used by `polyfill()` to
 * configure the `FocusGroup` constructor's `options.definition`.
 *
 * @param {HTMLElement} owner
 * @returns {FocusGroupDefinition}
 */
export function parseDefinition(owner: HTMLElement): FocusGroupDefinition;
export function generateUniqueId(): string;
/**
 * Whether the given element is keyboard focusable (tabbable).
 *
 * @param {HTMLElement} element
 * @param {HTMLElement=} owner
 * @returns {boolean}
 */
export function isKeyboardFocusable(element: HTMLElement, owner?: HTMLElement | undefined): boolean;
/**
 * Gets the navigation direction (“forward” or “backward”) based on:
 *
 * - The key that the user just pressed
 * - The owner element’s writing mode and direction
 * - The current focus group’s directional limit (“inline”, “block”, none)
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {HTMLElement} owner - The owner element.
 * @param {("inline" | "block" | undefined)} axis - The directional limitation.
 * @returns {("forward" | "backward" | "start" | "end" | null)} Returns `null`
 *     if there shouldn’t be navigation, e.g. when directional limit applies.
 */
export function getNavigationDirection(event: KeyboardEvent, owner: HTMLElement, axis: ("inline" | "block" | undefined)): ("forward" | "backward" | "start" | "end" | null);
/**
 * Whether a given element has keyboard conflicts with navigation keys, in which
 * case they should be considered as segmentors.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isKeyConflictElement(el: any): boolean;
/**
 * Whether a nested focusgroup element creates a segment boundary.
 *
 * A segmentor is:
 * - A focusable element with focusgroup="none" (opted-out tab stop), or
 * - A non-focusable nested focusgroup whose subtree contains focusable
 *   elements (the subtree is an independent tab stop)
 *
 * @param {HTMLElement} element
 * @param {HTMLElement=} owner
 * @returns {boolean}
 */
export function isSegmentor(element: HTMLElement, owner?: HTMLElement | undefined): boolean;
/**
 * Infer or clear the ARIA role on a focusgroup element.
 *
 * Looks up the role from RoleMap for the given behavior and kind.
 * Sets the role if the element has no author-defined role (or already has an
 * inferred one). Clears a previously inferred role when the behavior has no
 * mapped role for that kind.
 *
 * @param {HTMLElement} element
 * @param {string} behavior - The focusgroup behavior token.
 * @param {"owner" | "child"} kind - Which role to look up from RoleMap.
 */
export function inferRole(element: HTMLElement, behavior: string, kind: "owner" | "child"): void;
/**
 * Whether the given element has a ARIA `generic` role.
 * NOTE: This function leverages a non-Baseline property, `computedRole`, and
 * falls back to only check if the given element is a `<div>`, a `<span>`, or a
 * custom element, which is far from comprehensive, but it should cover most of
 * the use cases and maintain reasonable performance. For a comprehensive list
 * of HTML elements with a `generic` role, see:
 * https://www.w3.org/TR/html-aria/#docconformance
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function hasGenericRole(element: HTMLElement): boolean;
export type FocusGroupDefinition = {
    behavior?: BehaviorToken;
    wrap?: boolean;
    axis?: ("inline" | "block" | undefined);
    memory?: boolean;
};
import { BehaviorToken } from "./constants.js";
