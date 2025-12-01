 export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    // @methodtype constructor
    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        // copy the input array to avoid changing it later by accident
        this.components = [...other];
        // if no delimiter given, use default one
        this.delimiter = delimiter ? delimiter: DEFAULT_DELIMITER;
    }

    // @methodtype conversion-method
    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        // join all parts together with the chosen delimiter
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    public asDataString(): string {
        // using the default delimiter (same as used internally)
        return this.components.join(this.delimiter);
    }

    /** Returns properly masked component string */
    public getComponent(i: number): string {
        // return the component at index i
        return this.components[i];
    }

    // @methodtype set-method
    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        // replace the value at position i with c
        this.components[i] = c; 
    }

    // @methodtype get-method 
    /** Returns number of components in Name instance */
     public getNoComponents(): number {
        // number of elements in the list
        return this.components.length;
    }

    // @methodtype update-method
    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        // insert element at position i
        this.components.splice(i, 0, c);
    }

    // @methodtype update-method
    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        // add element to the end of the list
        this.components.push(c);
    }

    // @methodtype update-method
    public remove(i: number): void {
        // remove element at position i
        this.components.splice(i, 1);
    }

}
