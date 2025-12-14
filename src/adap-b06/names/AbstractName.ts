import { DEFAULT_DELIMITER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

import { Name } from "./Name";

/**
 * Abstract base class for Name value objects
 * Provides common functionality such as equality, hashing,
 * and string representations
 */
export abstract class AbstractName implements Name {

    // Each name has a delimiter character (like a space or dash) to join components
    protected readonly delimeter: string;

    // Constructor sets the delimiter, defaulting to DEFAULT_DELIMITER
    protected constructor(delimeter: string = DEFAULT_DELIMITER) {
        // Make sure delimiter is just a single character
        IllegalArgumentException.assert(
            delimeter.length === 1, 
            "delimiter must be a single character");
        this.delimeter = delimeter;
    }

    /** 
     * clone() just returns itself because Name objects are immutable
     * So copying is safe
     */
    public clone(): Name {
        return this;
    }

    /**
     * Returns the name as a string using the given delimiter
     * If no delimiter is given, it uses the one from the object
     */
    public asString(delimeter: string = this.delimeter): string {
        IllegalArgumentException.assert(
            delimeter.length === 1, 
            "delimiter must be a single character");
        const parts: string[] = [];

        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(delimeter);
    }

    // Default string representation just calls asDataString()
    public toString(): string {
        return this.asDataString();
    }

    /**
     * Returns the name as a string using the object's own delimiter
     * This is useful internally for comparing and hashing
     */
    public asDataString(): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(this.delimeter);
    } 

    /**
     * Checks if this name is equal to another
     * Only equal if the other object is also an AbstractName and all components match
     */
    public isEqual(other: Object): boolean {
        if (!(other instanceof AbstractName)) {
            return false;
        }
        return this.asDataString() === other.asDataString();
    }

    /**
     * Simple hash function based on the string representation
     * Could be used in hash maps or sets
     */
    public getHashCode(): number {
        const s = this.asDataString();
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    // Returns true if this name has no components
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    //  Getter for the delimiter character
    public getDelimiterCharacter(): string {
        return this.delimeter;
    }

    // abstract API for subclasses
    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;

    abstract append(c: string): Name;
    abstract insert(i: number, c: string): Name;
    abstract setComponent(i: number, c: string): Name;
    abstract remove(i: number): Name;

    /**
     * Combine this name with another one
     * Goes component by component and appends each
     */
    public concat(other: Name): Name {
        let result: Name = this;
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }
}