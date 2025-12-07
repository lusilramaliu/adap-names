import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
}

export class File extends Node {
    // internal lifecycle flag for this file
    protected status: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // must be closed and not deleted
        this.checkNotDeleted("open");
        this.checkState(
            FileState.CLOSED,
            "file has to be closed before opening"
        );

    }

    public read(noBytes: number): Int8Array {
        // number of bytes must be positive
        IllegalArgumentException.assert(
            noBytes > 0,
            "requested byte count must be > 0"
        );

        // file must be open to read
        this.checkState(
            FileState.OPEN,
            "file must be open to read from it"
        );

        // same behavior as your original: empty buffer
        return new Int8Array();
    }

    public close(): void {
        // only an open file can be closed
        this.checkState(
            FileState.OPEN,
            "only an open file can be closed"
        );
    }

    public getBaseName(): string {
        const name = super.getBaseName();

        InvalidStateException.assert(
            name.length !== 0,
            "file base name must not be empty"
        );

        return name;
    }

    // -------- internal accessors --------

    protected doGetFileState(): FileState {
        return this.status;
    }

    // -------- generic precondition helpers --------

    protected checkState(expected: FileState, message: string): void {
        IllegalArgumentException.assert(
            this.status === expected,
            message
        );
    }

    protected checkNotDeleted(operation: string): void {
        IllegalArgumentException.assert(
            this.status !== FileState.DELETED,
            `cannot ${operation} a deleted file`
        );
    }
}
