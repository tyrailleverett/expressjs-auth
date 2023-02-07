class UserNotFoundError extends Error {
    constructor() {
        super("User not found");
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default UserNotFoundError;
