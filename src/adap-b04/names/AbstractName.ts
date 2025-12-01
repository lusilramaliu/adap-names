import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
         // Every name object uses a delimiter, so we store it here once
         // Subclasses simply reuse it
        this.delimiter = delimiter;
    }

    public clone(): Name {
        // clone creates a new instance of the same runtime class
        const ctor: any = this.constructor;
        return new ctor(this.asDataString(), this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        // Convert all components into a readable string
        // Subclasses provide access to the components, so we simply combine them here
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(delimiter);
    }

    public toString(): string {
        // Default string representation: same as data string
        return this.asDataString();
    }

    public asDataString(): string {
        // Convert components into a machine-readable string
        // This is what clone() or external parsers would rely on
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        // Two names are equal if their data strings match exactly
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        // Simple text-based hash code based on the data string
        const s = this.asDataString();
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h += s.charCodeAt(i);
        }
        return h;
    }

    public isEmpty(): boolean {
        // A name is empty when it has no components
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        // Expose the delimiter being used by this name
        return this.delimiter;
    }

    // Subclasses must implement these, because only they know how
    // the components are stored internally
    // abstract methods: subclasses actually store components
    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    // Default concat (subclasses already support append())
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}