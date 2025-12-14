import { DEFAULT_DELIMITER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

/**
 * Name implementation backed by a single string
 * Basically, this turns a plain string into a Name object
 * Each component is separated by a delimiter (like space, dash, etc.)
 */
export class StringName extends AbstractName {
    // Store the actual string representing the name
    private readonly name: string;

    // Constructor takes the source string and an optional delimiter
    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter); // call parent constructor for delimiter setup
        // Make sure the source is really a string
        IllegalArgumentException.assert(
            typeof source === "string", 
            "source must be a string");
        this.name = source;
    }

    /**
     * Returns the number of components in the name
     * Split by delimiter and count, or 0 if empty string
     */
    public getNoComponents(): number {
        return this.name === "" ? 0 : this.name.split(this.delimeter).length;
    }

    /**
     * Get a specific component by index
     * Throws error if index is out of bounds
     */
    public getComponent(i: number): string {
        const parts = this.name === "" ? [] : this.name.split(this.delimeter);
        IllegalArgumentException.assert(
            i >= 0 && i < parts.length, 
            "index out of range");
        return parts[i];
    }

    /**
     * Append a new component at the end
     * Returns a new StringName (immutable design)
     */
    public append(c: string): Name {
        return this.name === ""
        ? new StringName(c, this.delimeter) // if empty, just return the new component
        : new StringName(this.name + this.delimeter + c, this.delimeter); // else join with delimiter
    }

    /**
     * Insert a component at a specific index
     * Returns a new StringName with the component inserted
     */
    public insert(i: number, c: string): Name {
        const parts = this.name === "" ? [] : this.name.split(this.delimeter);
        IllegalArgumentException.assert(
            i >= 0 && i <= parts.length, 
            "index out of range");
        parts.splice(i, 0, c); //  insert the new component
        return new StringName(parts.join(this.delimeter), this.delimeter);
    }

    /**
     * Replace a component at a specific index with a new value
     * Returns a new StringName object
     */
    public setComponent(i: number, c: string): Name {
        const parts = this.name.split(this.delimeter);
        IllegalArgumentException.assert(
            i >= 0 && i < parts.length, 
            "index out of range");
        parts[i] = c;
        return new StringName(parts.join(this.delimeter), this.delimeter);
    }

    /**
     * Remove a component at a specific index
     * Returns a new StringName without that component
     */
    public remove(i: number): Name {
        const parts = this.name.split(this.delimeter);
        IllegalArgumentException.assert(
            i >= 0 && i < parts.length, 
            "index out of range");
        parts.splice(i, 1);
        return new StringName(parts.join(this.delimeter), this.delimeter);
    }
}