import { concurrently } from "concurrently";

async function main() {
    const { result } = concurrently(
        [
            {
                command: "pnpm --filter @flyingboat/kofono build:watch",
                name: "kofono-core",
                prefixColor: "#15a6ff",
            },
            {
                command:
                    "pnpm --filter @flyingboat/kofono-solid-ui build:watch",
                name: "kofono-solid-ui",
                prefixColor: "#ffdd17",
            },
            {
                command: "pnpm --filter doc build:watch",
                name: "doc",
                prefixColor: "#15a6ff",
            },
        ],
        {
            // Show timestamp and command name in the prefix
            prefix: "{time} [{name}]",
            timestampFormat: "HH:mm:ss",
            killOthersOn: ["failure"], // stop others if one fails
            restartTries: 0,
        },
    );

    // Await until all commands exit; propagates non‑zero exit code if any fails
    await result;
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
