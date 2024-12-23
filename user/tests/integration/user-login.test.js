import request from "supertest";
import app from "../../src/app";
import Users from "../../src/models/Users";
import { StatusCodes } from "http-status-codes";
import { userAuthMessage } from "../../src/message/message";
import bcrypt from "bcryptjs";

describe("Login User API", () => {
    let user;

    beforeEach(async () => {
        // Create a test user in the database
        user = await Users.create({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
            isDeactivated: false,
            failed_login_attempts: 0,
            last_failed_attempt_at: null,
            subscription: "premium",
        });
    });

    afterEach(async () => {
        // Cleanup the database
        await Users.deleteMany({});
    });

    it("should login successfully with valid credentials", async () => {
        const response = await request(app).post("/users/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Successfully logged in");
        expect(response.body.user.email).toBe("testuser@example.com");
        expect(response.body.token).toBeDefined();
    });

    it("should fail with invalid email", async () => {
        const response = await request(app).post("/users/auth/login").send({
            email: "invaliduser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.invalidCredentials);
    });

    it("should fail with invalid password", async () => {
        const response = await request(app).post("/users/auth/login").send({
            email: "testuser@example.com",
            password: "wrongpassword",
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.invalidCredentials);

        // TODO - Failed attempts are updating but unable to access them here
        // const updatedUser = await Users.findOne({ email: "testuser@example.com" });
        // expect(updatedUser.failed_login_attempts).toBe(1);
        // expect(updatedUser.last_failed_attempt_at).toBeDefined();
    });

    it("should fail for deactivated user", async () => {
        const userOne = await Users.findOne({ email: "testuser@example.com" });
        // const userOne = await Users.findOne({ email: "testuser@example.com" }).select("+isDeactivated");
        // userOne.isDeactivated = true
        // await userOne.save()
        await Users.findByIdAndUpdate(userOne._id, { isDeactivated: true });

        const userafter = await Users.findOne({ email: "testuser@example.com" }).select(
            "+isDeactivated"
          );

        const response = await request(app).post("/users/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.deactiveUser);
    });

    it("should lock the account after multiple failed login attempts", async () => {
        await Users.findByIdAndUpdate(user._id, {
            failed_login_attempts: 5,
            last_failed_attempt_at: Date.now(),
        });

        const response = await request(app).post("/users/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toContain("Account locked");

        const updatedUser = await Users.findOne({ email: "testuser@example.com" });
        expect(updatedUser.failed_login_attempts).toBe(5);
    });

    it("should reset failed login attempts on successful login", async () => {
        await Users.findByIdAndUpdate(user._id, {
            failed_login_attempts: 2,
            last_failed_attempt_at: Date.now(),
        });

        const response = await request(app).post("/users/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.OK);

        const updatedUser = await Users.findOne({ email: "testuser@example.com" });
        expect(updatedUser.failed_login_attempts).toBe(0);
        expect(updatedUser.last_failed_attempt_at).toBeUndefined();
    });

    it("should sanitize email before querying the database", async () => {
        const response = await request(app).post("/users/auth/login").send({
            email: "TestUser@example.com", // case difference
            password: "password123",
        });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.user.email).toBe("testuser@example.com");
    });

    it("should return appropriate error for missing email or password", async () => {
        const response = await request(app).post("/users/auth/login").send({});

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toContain(`"email" is not allowed to be empty`);
    });
});
