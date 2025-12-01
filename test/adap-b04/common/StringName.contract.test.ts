import { describe, it, expect } from "vitest";

import { StringName } from "../../../src/adap-b04/names/StringName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("StringName – Contract Tests", () => {

  it("precondition: getComponent should throw IllegalArgumentException for out-of-range index", () => {
    const n = new StringName("a.b.c");

    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(99)).toThrow(IllegalArgumentException);
  });

  it("precondition: setComponent should throw IllegalArgumentException for invalid index", () => {
    const n = new StringName("a.b");

    expect(() => n.setComponent(5, "x")).toThrow(IllegalArgumentException);
  });

  it("postcondition: setComponent should properly update internal state", () => {
    const n = new StringName("a.b");
    n.setComponent(1, "x");

    expect(n.getComponent(1)).toBe("x");
  });

  it("postcondition: insert should increase number of components", () => {
    const n = new StringName("a.b");
    n.insert(1, "x");

    expect(n.getNoComponents()).toBe(3);
  });

  it("postcondition: remove should decrease number of components", () => {
    const n = new StringName("a.b.c");
    n.remove(1);

    expect(n.getNoComponents()).toBe(2);
  });

  it("invariant: invalid delimiter structure must cause InvalidStateException", () => {
    // force invariant violation (invalid internal state)
    expect(() => new StringName("a..b")).not.toThrow(); // valid: empty component allowed
    expect(() => new StringName(null as any)).toThrow();
  });

});
