import { registerUser, removeUser } from "../../services/auth.service";

describe("Testing Auth Service", () => {
    describe("Testing Registering a User", () => {
        test("Should return registered user", async () => {
            const registeredUser = await registerUser("user8", "password8");
            expect(registeredUser).toMatchObject({
                id: expect.any(Number),
                username: "user8"
            });
            expect(registeredUser.id).toBe(4);
        });

        test("Should throw an error if user already exists", async () => {
            try {
                await registerUser("user1", "password1");
            } catch (err) {
                expect(err).toEqual(new Error("Username already exists"));
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
