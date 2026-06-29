/**
 * Flushes all globally registered focusgroup MutationObservers by calling
 * `takeRecords()` on each, discarding any pending mutation records that were
 * caused by polyfill-managed attribute writes. This prevents infinite
 * cross-group loops between nested focusgroups whose subtrees overlap.
 */
export function flushAllObservers(): void;
/** @type {Set<MutationObserver>} */
export const observers: Set<MutationObserver>;
