import { DEFAULT_DELIMITER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

/**
 * Name implementation backed by an array of strings
 * 
 * This class represents a Name as a simple list of components
 */
export class StringArrayName extends AbstractName {

     /**
     * Internal storage of name components
     *
     * Marked as readonly to prevent accidental modification
     */

    private readonly components: readonly string[];

    /**
     * Creates a new StringArrayName from an array of components
     *
     * source     Array of name components
     * delimiter  Delimiter character used for string rendering
     */

    constructor(source: readonly string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        // Defensive check: caller must provide an array
        IllegalArgumentException.assert(
            Array.isArray(source), 
            "source must be an array");

        // Defensive copy to preserve immutability
        this.components = [...source];
    }

    /**
     * Returns the number of components in this name
     */
    public getNoComponents(): number {
        return this.components.length;
    }

    /**
     * Returns the component at the given index
     * Throws an exception if the index is out of range
     */
    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "index out of range");
        return this.components[i];
    }

    /**
     * Returns a new Name with the given component appended
     * at the end
     */
    public append(c: string): Name {
        return new StringArrayName([...this.components, c], this.delimeter);
    }

    /**
     * Returns a new Name with the given component inserted
     * at position i
     */
    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(
            i >= 0 && i <= this.components.length,
            "index out of range");

        const copy = [...this.components];
        copy.splice(i, 0, c);
        return new StringArrayName(copy, this.delimeter);
    }

    /**
     * Returns a new Name where the component at index i
     * is replaced by the given value
     */
    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length, 
            "index out of range");

        const copy = [...this.components];
        copy[i] = c;
        
        return new StringArrayName(copy, this.delimeter);
    }

    /**
     * Returns a new Name with the component at index i removed
     */
    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "index out of range");
        const copy = [...this.components];
        copy.splice(i, 1);
        return new StringArrayName(copy, this.delimeter);
    }
}