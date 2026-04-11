export function isArrayEqual(a: any[], b: []): boolean {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== a[i]) {
            return false;
        }
    }
    return true;
}
