import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);

        // Make sure the constructor actually receives an array
        IllegalArgumentException.assert(
            Array.isArray(source),
            "source must be an array of strings"
        );
        // We store our own copy so outside changes don't affect us
        this.components = [...source];

        // Basic class invariant: components should always stay an array
        InvalidStateException.assert(
            Array.isArray(this.components),
            "components must be an array"
        );
    }

    public clone(): Name {
        // Create a full copy of this object including the component array
        return new StringArrayName([...this.components], this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        // A human-readable string using the chosen delimiter
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        // Machine-readable format: always uses this.delimiter
        return this.components.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        // Two names are equal if their data representation matches exactly
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        // Simple hash code based on summing character codes
        const s = this.asDataString();
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h += s.charCodeAt(i);
        }
        return h;
    }

    public isEmpty(): boolean {
        // A name is empty if it contains no components
        return this.components.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // Index must be inside the valid range
        IllegalArgumentException.assert(
            i >= 0 && i < this.getNoComponents(),
            "index out of range"
        );
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        // Replace an existing component
        IllegalArgumentException.assert(
            i >= 0 && i < this.getNoComponents(),
            "index out of range"
        );

        this.components[i] = c;

        // Postcondition: the update must have been applied
        MethodFailedException.assert(
            this.components[i] === c,
            "postcondition failed"
        );
    }

    public insert(i: number, c: string): void {
        // Allow inserting at the end too (i == size)
        IllegalArgumentException.assert(
            i >= 0 && i <= this.getNoComponents(),
            "index out of range"
        );

        const before = this.getNoComponents();
        this.components.splice(i, 0, c);

        // Component count must increase by one
        MethodFailedException.assert(
            this.getNoComponents() === before + 1,
            "insert failed"
        );
    }

    public append(c: string): void {
        // Append simply adds at the end
        const before = this.getNoComponents();
        this.components.push(c);

        // Same size check as insert
        MethodFailedException.assert(
            this.getNoComponents() === before + 1,
            "append failed"
        );
    }

    public remove(i: number): void {
        // Can only remove an existing component
        IllegalArgumentException.assert(
            i >= 0 && i < this.getNoComponents(),
            "index out of range"
        );

        const before = this.getNoComponents();
        this.components.splice(i, 1);

        // Component count must decrease by one
        MethodFailedException.assert(
            this.getNoComponents() === before - 1,
            "remove failed"
        );
    }

    public concat(other: Name): void {
        // Append each component from the other name
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
}
