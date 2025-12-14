import { OverloadsNarrowedByParameters } from "expect-type";
import { Cloneable } from "../common/Cloneable";
import { Equality } from "../common/Equality";
import { Printable } from "../common/Printable";

/**
 * A Name is a value object representing a hierarchical name.
 *
 * Names are immutable:
 *  - every modifying operation returns a new Name
 *  - existing instances are never changed
 * As a value object, Name:
 *  - supports cloning (Cloneable)
 *  - supports value-based equality (Equality)
 *  - supports string representations (Printable)
 */
export interface Name  extends Cloneable, Equality, Printable {
    /** Number of components in this name */
    getNoComponents(): number;

    /** Returns the i-th component 
     * The index is zero-based.
     * Implementations are expected to throw an exception
     * if the index is out of bounds.
    */
    getComponent(i: number): string;

    /** True if the name has no components
     * An empty name represents the root or an undefined path,
     * depending on the context
     */
    isEmpty(): boolean;

    /** Returns a new Name with component appended */
    append(c: string): Name;

    /** Returns a new Name with component inserted 
     * at position i
     * Existing components are shifted accordingly
    */
    insert(i: number, c: string): Name;

    /** Returns a new Name where the component at index i
     * is replaced by the given value
     */
    setComponent(i: number, c: string): Name;

    /** Returns a new Name with component at index i removed */
    remove(i: number): Name;

     /** Returns a new Name that is the concatenation of this name
     * and another name 
     * 
     * Neither of the original Name instances is modified
     */
     concat(other: Name): Name;
}
    