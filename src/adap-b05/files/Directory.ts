import { Node } from "./Node";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

/**
 * A directory that can contain child nodes.
 */
export class Directory extends Node {
  protected childNodes: Set<Node> = new Set<Node>();

  constructor(bn: string, pn: Directory | null) {
    super(bn, pn);
  }

  public addChildNode(n: Node): void {
    this.childNodes.add(n);
  }

  public getChildNodes(): Set<Node> {
    return this.childNodes;
  }

  /**
   * Recursive search:
   * - checks this directory
   * - recurses into children
   * - wraps InvalidStateException from buggy nodes into ServiceFailureException
   */
  public override findNodes(bn: string): Set<Node> {
    const result = new Set<Node>();

    try {
      // Check this directory itself
      if (this.getBaseName() === bn) {
        result.add(this);
      }

      // Then search in children
      for (const c of this.childNodes) {
        try {
          const childResults = c.findNodes(bn);
          for (const n of childResults) {
            result.add(n);
          }
        } catch (inner) {
          // If a child already wrapped the error, just propagate
          if (inner instanceof ServiceFailureException) {
            throw inner;
          }
          // If a buggy node throws InvalidStateException directly, wrap once here
          if (inner instanceof InvalidStateException) {
            throw new ServiceFailureException("search failed", inner);
          }
          throw inner;
        }
      }
    } catch (ex) {
      // Directory itself could also fail due to a bad base name
      if (ex instanceof InvalidStateException) {
        throw new ServiceFailureException("search failed", ex);
      }
      throw ex;
    }

    return result;
  }
}
