/** biome-ignore-all lint/suspicious/noConsole: its a cli script */

// --------------------------------------
// publish the current version as canary
// and create a dist-tag latest for it
// --------------------------------------
// TODO: turn off dist-tag for latest when we have a stable version

import { exec } from "node:child_process";
import { promisify } from "node:util";

import packageJson from "../package.json";

function getPackageVersion() {
    return packageJson.version;
}

const execAsync = promisify(exec);

async function main() {
    const version = getPackageVersion();
    console.log(version);

    const prepublish = await execAsync("pnpm prepublish");
    if (prepublish.stdout) console.log(prepublish.stdout);
    if (prepublish.stderr) console.error(prepublish.stderr);

    const publish = await execAsync("npm publish --tag canary --access public");
    if (publish.stdout) console.log(publish.stdout);
    if (publish.stderr) console.error(publish.stderr);

    const distTag = await execAsync(
        `npm dist-tag add @flyingboat/kofono@${version} latest`,
    );
    if (distTag.stdout) console.log(distTag.stdout);
    if (distTag.stderr) console.error(distTag.stderr);
}

main().catch(error => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});
