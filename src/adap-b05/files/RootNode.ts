import { Directory } from "./Directory";

/**
 * Root of the filesystem tree.
 * Has no real parent; we treat parentNode specially.
 */
export class RootNode extends Directory {
  constructor() {
    // Root has no parent → pass null
    super("", null);
    // Conceptually, make root its own parent to avoid null checks elsewhere
    this.parentNode = this;
  }

  // basename of root is empty string
  public override getBaseName(): string {
    return "";
  }
}
