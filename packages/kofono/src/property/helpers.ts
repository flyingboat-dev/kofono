/**
 * Validate a given selector respect basic rules
 */
export function validateSelector(selector: string): [boolean, string] {
    if (selector === "") {
        return [false, "selector cannot be empty."];
    }
    const onlyAlphaNumeric = /^[a-zA-Z0-9._]+$/;
    if (!onlyAlphaNumeric.test(selector)) {
        return [
            false,
            `selector must contains only alphanumeric, dot or underline. Got: ${selector}`,
        ];
    }
    const startsWithAlphanumeric = /^[a-zA-Z0-9]/;
    if (!startsWithAlphanumeric.test(selector)) {
        return [
            false,
            `selector must start with an alphanumeric character. Got: ${selector}`,
        ];
    }
    return [true, ""];
}
