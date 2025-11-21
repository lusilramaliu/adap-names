// StringName.ts
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);
        this.name = source;
        this.noComponents =
            source === "" ? 0 : source.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    // again, we reuse AbstractName's common behavior and only implement hooks

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const parts = this.name.split(this.delimiter);
        return parts[i];
    }

    public setComponent(i: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        parts[i] = c;
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public insert(i: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        parts.splice(i, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public append(c: string): void {
        if (this.isEmpty()) {
            this.name = c;
        } else {
            this.name = this.name + this.delimiter + c;
        }
        this.noComponents++;
    }

    public remove(i: number): void {
        const parts = this.name.split(this.delimiter);
        parts.splice(i, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }
}
