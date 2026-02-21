import * as util from "node:util";

export const deepLog = (...stuff: unknown[]): void => {
    for (const s of stuff) {
        // biome-ignore lint/suspicious/noConsole: we need this for debugging
        console.log(util.inspect(s, false, null, true));
    }
};
