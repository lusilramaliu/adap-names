import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);

        // constructor precondition
        // The constructor only accepts a string
        // Anything else would make this class unreliable
        IllegalArgumentException.assert(
            typeof source === "string",
            "source must be a string"
        );

        // Store the raw name and count its components
        this.name = source;
        this.noComponents =
            this.name === "" ? 0 : this.name.split(this.delimiter).length;

        // Invariant: the stored component count must always match the actual structure
        InvalidStateException.assert(
            this.noComponents === (this.name === "" ? 0 : this.name.split(this.delimiter).length),
            "invariant broken"
        );
    }

    public clone(): Name {
        // Return a new instance with the same internal data
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        // Convert the name into a string using any delimiter the caller requests
        return this.name.split(this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        // The raw machine-readable version of the name
        return this.name;
    }

    public isEqual(other: Name): boolean {
        // Two names are equal if their serialized form matches
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        // Basic character-sum hash used for testing and consistency
        let h = 0;
        for (let i = 0; i < this.name.length; i++) {
            h += this.name.charCodeAt(i);
        }
        return h;
    }

    public isEmpty(): boolean {
        // A name with zero components is considered empty
        return this.noComponents === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        // Components can only be accessed if the index is valid
        IllegalArgumentException.assert(
            i >= 0 && i < this.noComponents,
            "index out of range"
        );
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string): void {
        // Basic range check before modifying anything
        IllegalArgumentException.assert(
            i >= 0 && i < this.noComponents,
            "index out of range"
        );

        const parts = this.name.split(this.delimiter);
        parts[i] = c;
        this.name = parts.join(this.delimiter);

        // Make sure the change actually applied
        MethodFailedException.assert(
            this.getComponent(i) === c,
            "setComponent failed"
        );

        // invariant
        this.recheckInvariant();
    }

    public insert(i: number, c: string): void {
        // Inserting is allowed at the end as well
        IllegalArgumentException.assert(
            i >= 0 && i <= this.noComponents,
            "index out of range"
        );

        const parts = this.isEmpty() ? [] : this.name.split(this.delimiter);
        const before = parts.length;

        parts.splice(i, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;

        // After insertion, exactly one more component should exist
        MethodFailedException.assert(
            this.noComponents === before + 1,
            "insert failed"
        );

        this.recheckInvariant();
    }

    public append(c: string): void {
        // Remember the size before appending
        const before = this.noComponents;

        if (this.isEmpty()) {
            this.name = c;
        } else {
            this.name = this.name + this.delimiter + c;
        }

        this.noComponents++;

        // Ensure the append actually increased the component count
        MethodFailedException.assert(
            this.noComponents === before + 1,
            "append failed"
        );

        this.recheckInvariant();
    }

    public remove(i: number): void {
        // You can only remove an existing component
        IllegalArgumentException.assert(
            i >= 0 && i < this.noComponents,
            "index out of range"
        );

        const parts = this.name.split(this.delimiter);
        const before = parts.length;

        parts.splice(i, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;

        // Removing reduces the size by exactly one
        MethodFailedException.assert(
            this.noComponents === before - 1,
            "remove failed"
        );

        this.recheckInvariant();
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        this.recheckInvariant();
    }

    /** Helper to validate invariant after state changes */
    private recheckInvariant(): void {
        InvalidStateException.assert(
            this.noComponents === (this.name === "" ? 0 : this.name.split(this.delimiter).length),
            "invariant broken"
        );
    }

}
