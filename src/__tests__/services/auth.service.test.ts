import { registerUser, removeUser } from "../../services/auth.service";
import UserAlreadyExistError from "../../errors/userAlreadyExistError";

describe("Testing Auth Service", () => {
    describe("Testing Registering a User", () => {
        test("Should return registered user", async () => {
            const registeredUser = await registerUser("user4", "password4");
            expect(registeredUser).toMatchObject({
                id: expect.any(Number),
                username: "user4",
                password: expect.any(String)
            });
            expect(registeredUser.id).toBe(4);
            expect(registeredUser.password).not.toBe("password4");
        });

        test("Should throw an error if user already exists", async () => {
            try {
                await registerUser("user1", "password1");
            } catch (err) {
                expect(err).toEqual(new UserAlreadyExistError());
            }
        });
    });
    describe("Testing deleting a user", () => {
        test("Should delete a user", () => {
            expect(async () => {
                await removeUser(1);
            }).not.toThrow(new Error());
        });
    });
});
