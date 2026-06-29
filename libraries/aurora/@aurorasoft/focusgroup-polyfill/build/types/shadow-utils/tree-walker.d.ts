export function createTreeWalker(doc: any, root: any, whatToShow: any, filter: any): ShadowTreeWalker;
declare class ShadowTreeWalker {
    constructor(doc: any, root: any, whatToShow: any, filter: any);
    filter: any;
    root: any;
    whatToShow: any;
    set currentNode(node: Node);
    get currentNode(): Node;
    nextNode(): Node;
    previousNode(): any;
    #private;
}
export {};
