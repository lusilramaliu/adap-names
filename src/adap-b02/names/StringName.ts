import { C } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype constructor
    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        // store the raw string
        this.name = source;
        // count components once at construction time
        this.noComponents = source == "" ? 0 : source.split(this.delimiter).length;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        // convert internal string into array and rebuild with given delimiter
        return this.name.split(this.delimiter).join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        // return exact internal representation
        return this.name;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get-method
    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        // split into parts to access by index
        const parts = this.name.split(this.delimiter);
        return parts[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        parts[n] = c;   
        this.name = parts.join(this.delimiter);
    }

    // @methodtype update-method
    public insert(n: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        // insert new component at index n
        parts.splice(n, 0, c);
        // update internal state
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    // @methodtype update-method
    public append(c: string): void {
        if (this.isEmpty()) {
            this.name = c;
        }
        else
        {
            this.name = this.name + this.delimiter + c;
        }
        this.noComponents++;
    }

    // @methodtype update-method
    public remove(n: number): void {
        const parts = this.name.split(this.delimiter);
        parts.splice(n, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    // @methodtype update-method
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++);
        {
            this.append(other.getComponent(i));
        }
    }

}