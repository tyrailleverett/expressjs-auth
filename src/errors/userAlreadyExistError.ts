class UserAlreadyExistError extends Error {
    constructor() {
        super("User Already Exists");
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default UserAlreadyExistError;
