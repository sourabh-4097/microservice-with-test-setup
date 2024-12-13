const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

describe("User Service API", () => {
    it("should create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john@example.com",
            password: "john@example",
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Doe");

        const user = await User.findOne({ email: "john@example.com" });
        expect(user).not.toBeNull();
    });

    it("should fetch all users", async () => {
        await User.create({ name: "Alice", email: "alice@example.com", password: "john@example", });

        const response = await request(app).get("/users");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe("Alice");
    });

    it("should update a user", async () => {
        const user = await User.create({ name: "Bob", email: "bob@example.com", password: "john@example", });

        const response = await request(app).put(`/users/${user._id}`).send({
            name: "Bob Updated",
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Bob Updated");

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.name).toBe("Bob Updated");
    });

    it("should delete a user", async () => {
        const user = await User.create({ name: "Charlie", email: "charlie@example.com", password: "john@example", });

        const response = await request(app).delete(`/users/${user._id}`);

        expect(response.status).toBe(200);

        const deletedUser = await User.findById(user._id);
        expect(deletedUser).toBeNull();
    });
});
