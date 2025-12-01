import { describe, it, expect } from "vitest";

import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("StringArrayName – Contract Tests", () => {

  it("precondition: getComponent should throw IllegalArgumentException for invalid index", () => {
    const n = new StringArrayName(["a", "b", "c"]);

    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(99)).toThrow(IllegalArgumentException);
  });

  it("precondition: setComponent should throw IllegalArgumentException for invalid index", () => {
    const n = new StringArrayName(["a"]);

    expect(() => n.setComponent(5, "x")).toThrow(IllegalArgumentException);
  });

  it("postcondition: setComponent should satisfy postcondition", () => {
    const n = new StringArrayName(["a", "b"]);
    n.setComponent(1, "x");

    expect(n.getComponent(1)).toBe("x");
  });

  it("postcondition: insert should increase number of components", () => {
    const n = new StringArrayName(["a", "b"]);
    n.insert(1, "x");

    expect(n.getNoComponents()).toBe(3);
  });

  it("postcondition: remove should decrease number of components", () => {
    const n = new StringArrayName(["a", "b", "c"]);
    n.remove(1);

    expect(n.getNoComponents()).toBe(2);
  });

  it("invariant: components array must be valid", () => {
    expect(() => new StringArrayName(null as any)).toThrow();
    expect(() => new StringArrayName(undefined as any)).toThrow();
  });
});
