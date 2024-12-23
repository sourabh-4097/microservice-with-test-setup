import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app"; // Your Express app instance
import Users from "../../src/models/Users";
import { userAuthMessage, defaultMessage } from "../../src/message/message";
import { StatusCodes } from "http-status-codes";

// Mock JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "ding_dong";

// Mock user data
const validUserData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "$Password@123", // bcrypt hash of validPassword
    password_history: [],
    role_type: "admin",
};
const validPassword = "Password@123";
const oldPassword = "OldPass@123";
const newPassword = "NewPass@123";
let validToken;
let validUser;

describe("POST users/auth/change-password", () => {
    beforeEach(async () => {
        // Seed the database with the mock user
        validUser = await Users.create(validUserData);
        // Mock tokens
        validToken = jwt.sign({ userId: validUser._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Users.deleteMany({});
    });

    it("should successfully change the password", async () => {
        // Mock user comparison for old password
        const user = await Users.findById(validUser._id).select("+password");
        user.password = oldPassword;
        await user.save();

        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: validUser._id,
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            status: defaultMessage.success,
            message: userAuthMessage.passwordReset,
        });

        // Ensure the new password is hashed and saved in the database
        const updatedUser = await Users.findById(validUser._id).select("+password");
        const isMatch = await updatedUser.comparePassword(newPassword);
        expect(isMatch).toBe(true);
    });

    it("should fail if old password is incorrect", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: validUser._id,
                password: newPassword,
                oldPassword: "WrongPass@123",
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.invalidOldPassword);
    });

    it("should fail if the new password was used in the last three changes", async () => {
        const user = await Users.findById(validUser._id);
        user.password_history = [
            { password: await user.createPass("OldPasst@123"), changedAt: Date.now() },
            { password: await user.createPass("NewPass@123"), changedAt: Date.now() },
            { password: await user.createPass("LatestPass@123"), changedAt: Date.now() },
        ];
        user.password = oldPassword;
        await user.save();

        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: validUser._id,
                password: "NewPass@123",
                oldPassword: "OldPass@123",
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.passwordReUse);
    });

    it("should fail if the user is not authenticated", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .send({
                user_id: validUser._id,
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body.message).toBe(userAuthMessage.invalidToken);
    });

    it("should fail if the user does not exist", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: "64d42e30c977c91234567891", // Nonexistent user ID
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toBe(userAuthMessage.invalidCredentials);
    });

    it("should fail if the request payload is invalid", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: validUser._id,
                password: "short", // Invalid password
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toContain(
            "\"password\" length must be at least 8 characters long"
        );
    });

    it("should fail if the new password does not meet validation requirements", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                user_id: validUser._id,
                password: "1234567890", // Too short, no special characters
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toContain(
            "Password must include at least one uppercase letter"
        );
    });

    it("should fail if no user ID is provided", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.message).toContain('\"user_id\" is not allowed to be empty');
    });

    it("should fail if the JWT token is invalid", async () => {
        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", "Bearer InvalidToken")
            .send({
                user_id: validUser._id,
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body.message).toBe('jwt malformed');
    });

    it("should fail if user has an expired session token", async () => {
        const expiredToken = jwt.sign({ userId: validUser._id }, JWT_SECRET, {
            expiresIn: "1s",
        });

        // Wait for token to expire
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await request(app)
            .post("/users/auth/change-password")
            .set("Authorization", `Bearer ${expiredToken}`)
            .send({
                user_id: validUser._id,
                password: newPassword,
                oldPassword,
            });

        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body.message).toBe('jwt expired');
    });
});
