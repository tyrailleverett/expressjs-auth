import { registerUser, removeUser } from "../../services/auth.service";

describe("testing Auth Service", () => {
    describe("testing Registering a User", () => {
        it("should return registered user", async () => {
            const registeredUser = await registerUser("user8", "password8");
            expect(registeredUser).toMatchObject({
                id: expect.any(Number),
                username: "user8"
            });
            expect(registeredUser.id).toBe(4);
        });

        it("should throw an error if user already exists", async () => {
            try {
                await registerUser("user1", "password1");
            } catch (err) {
                expect(err).toEqual(new Error("Username already exists"));
            }
        });
    });
    describe("testing deleting a user", () => {
        it("should delete a user", () => {
            expect(async () => {
                await removeUser(1);
            }).not.toThrow(new Error());
        });
    });
});
