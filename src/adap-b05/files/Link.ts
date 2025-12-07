import { Node } from "./Node";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

/**
 * A link that delegates operations to a target node.
 */
export class Link extends Node {
  protected targetNode: Node | null = null;

  constructor(bn: string, pn: Directory, tn?: Node) {
    // Regular node initialization (adds the link to its parent directory)
    super(bn, pn);

    // If an initial target is provided, store it
    if (tn !== undefined) {
      this.targetNode = tn;
    }
  }

  /** 
   * Returns the node this link currently points to
   * Might be null if the link is not fully configured
   */
  public getTargetNode(): Node | null {
    return this.targetNode;
  }

  /**
   * Assigns or clears the link's target
   * Passing null is allowed, but attempting to *use* a null target
   * will throw an InvalidStateException
   */
  public setTargetNode(target: Node | null): void {
    this.targetNode = target;
  }

  /**
   * Link behaves like its target for basename and rename
   * If there is no target, that's an invalid state
   */
  public override getBaseName(): string {
    const target = this.ensureTargetNode(this.targetNode);
    return target.getBaseName();
  }

  /**
   * Renaming a link actually renames its target
   * This mirrors symbolic-link-like behavior
   */
  public override rename(bn: string): void {
    const target = this.ensureTargetNode(this.targetNode);
    target.rename(bn);
  }

  /**
   * Ensures the link has a valid target before delegating an action
   * If not, we throw InvalidStateException. Directory.findNodes()
   * will then wrap this into a ServiceFailureException
   */
  protected ensureTargetNode(target: Node | null): Node {
    if (target === null) {
      throw new InvalidStateException("Link has no target node");
    }
    return target;
  }
}
