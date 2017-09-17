export class CustomError {
    public name: string;
    public message: string;
    constructor(message: string) {
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
    }
}

export class GameUpdatingError extends CustomError {
    constructor() {
        super('The game is being updated');
     }
}

export class NotFoundError extends CustomError {
    constructor() {
        super('Response from fpl is not in the expected format');
     }
}

export class NoResponseError extends CustomError {
    constructor() {
        super('No response received from fpl');
     }
}
