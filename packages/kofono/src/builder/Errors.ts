export class DuplicatePropertyUidError extends Error {
    constructor(uid: string) {
        super(`Duplicate property uid: ${uid}`);
    }
}
