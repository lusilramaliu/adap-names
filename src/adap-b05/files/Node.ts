import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

/**
 * Base class for all filesystem nodes (files, directories, links, root).
 */
export class Node {
  protected baseName: string;
  protected parentNode: Directory | null;

  constructor(bn: string, pn: Directory | null) {
    this.baseName = bn;
    this.parentNode = pn;

    // Only register as child if there is a real parent (root has none)
    if (pn !== null) {
      pn.addChildNode(this);
    }
  }

  public getBaseName(): string {
    return this.doGetBaseName();
  }

  protected doGetBaseName(): string {
    return this.baseName;
  }

  public rename(bn: string): void {
    this.baseName = bn;
  }

  public getParentNode(): Directory | null {
    return this.parentNode;
  }

  /**
   * Default leaf search implementation.
   * - checks only this node
   * - wraps InvalidStateException into ServiceFailureException
   */
  public findNodes(bn: string): Set<Node> {
    const result = new Set<Node>();

    try {
      // Leaf check: does this node match the name we are searching for
      if (this.getBaseName() === bn) {
        result.add(this);
      }
    } catch (ex) {
      // Buggy nodes (like BuggyFile) may throw InvalidStateException
      // From the outside, this must appear as a service failure
      if (ex instanceof InvalidStateException) {
        throw new ServiceFailureException("search failed", ex);
      }
      throw ex;
    }

    return result;
  }
}

/**
 * Minimal interface that parent directories must implement.
 * Implemented by Directory and RootNode (through inheritance).
 */
export interface Directory {
  addChildNode(node: Node): void;
}
