import { DataSelector } from "./DataSelector";
import { ReadOnlySelectorError } from "./ReadOnlySelectorError";

export class ReadOnlyDataSelector extends DataSelector {
    protected _delete(selector: string): void {
        throw new ReadOnlySelectorError("delete", selector);
    }

    protected _set(selector: string): void {
        throw new ReadOnlySelectorError("set", selector);
    }
}
