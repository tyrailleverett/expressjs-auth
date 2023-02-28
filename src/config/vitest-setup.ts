import db from "../db/db";

beforeAll(async () => {
  await db("users").insert([
    { username: "user1", password: "password1", avatar: "avatar1" },
    { username: "user2", password: "password2", avatar: "avatar2" },
    { username: "user3", password: "password3", avatar: "avatar3" }
  ]);
});

afterAll(async () => {
  await db("users").truncate();
});
