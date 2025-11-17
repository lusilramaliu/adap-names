import { C } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    // @methodtype constructor   
    constructor(source: string[], delimiter?: string) {
        // store a local copy so outside changes don't affect us
        this.components = [...source];
        // if no delimiter is passed in, fall back to default
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        // create a readable string using the chosen delimiter
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        // use the internal delimiter for the machine-readable version
        return this.components.join(this.delimiter);
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get-method
    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        // replace the value at the given index
        this.components[i] = c;
    }

    // @methodtype update-method
    public insert(i: number, c: string): void {
        // insert new component before index i
        this.components.splice(i, 0, c);
    }

    // @methodtype update-method
    public append(c: string): void {
        // add new component at the end
        this.components.push(c);
    }

    // @methodtype update-method
    public remove(i: number): void {
        // remove the component at index i
        this.components.splice(i, 1);
    }

    // @methodtype update-method
    public concat(other: Name): void {
        // append each component from 'other' in order
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

}