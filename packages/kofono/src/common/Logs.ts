type LogMessage = {
    message: string;
    type: "info" | "warning" | "error";
};

interface LogHandler {
    info(message: LogMessage["message"]): void;
    warning(message: LogMessage["message"]): void;
    error(message: LogMessage["message"]): void;
}

export class Logs {
    private _messages: LogMessage[] = [];

    log(message: LogMessage["message"], type: LogMessage["type"]): void {
        this._messages.push({
            message,
            type,
        });
    }

    info(message: LogMessage["message"]): void {
        this.log(message, "info");
    }

    warning(message: LogMessage["message"]): void {
        this.log(message, "warning");
    }

    error(message: LogMessage["message"]): void {
        this.log(message, "error");
    }

    namespace(namespace: string): LogHandler {
        return {
            info: (message: LogMessage["message"]) => {
                this.info(`${namespace}: ${message}`);
            },
            warning: (message: LogMessage["message"]) => {
                this.warning(`${namespace}: ${message}`);
            },
            error: (message: LogMessage["message"]) => {
                this.error(`${namespace}: ${message}`);
            },
        };
    }

    get messages(): LogMessage[] {
        return this._messages;
    }
}
