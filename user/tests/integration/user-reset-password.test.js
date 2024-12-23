import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app"; // Replace with the correct path to your Express app
import Users from "../../src/models/Users"; // Replace with the correct path to your User model
import ResetToken from "../../src/models/ResetToken"; // Replace with the correct path to your ResetToken model
import { userAuthMessage, defaultMessage } from "../../src/message/message"; // Replace with your message file
import { StatusCodes } from "http-status-codes";

// Mock data
const mockUserId = new mongoose.Types.ObjectId();
const mockResetToken = "mock-reset-token";
const mockPassword = "NewPassword@123";

describe("POST /users/auth/reset-password", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await Users.deleteMany({});
    await ResetToken.deleteMany({});
  });

  it("should successfully reset the password and delete the token", async () => {
    // Arrange
    const user = await Users.create({
      email: "testuser@example.com",
      password: "OldPassword123",
      name: "Test User",
      password_history: [],
    });

    await ResetToken.create({
      user_id: user._id,
      token: mockResetToken,
    });

    // Act
    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: mockResetToken,
        password: mockPassword,
      });

    // Assert
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.status).toBe(defaultMessage.success);
    expect(response.body.message).toBe(userAuthMessage.passwordReset);

    const updatedUser = await Users.findById(user._id).select("+password");
    expect(updatedUser).toBeDefined();
    const isMatch = await updatedUser.comparePassword(mockPassword);
    expect(isMatch).toBe(true);

    const resetTokens = await ResetToken.find({ user_id: user._id });
    expect(resetTokens.length).toBe(0);
  });

  it("should return 400 if reset token is invalid", async () => {
    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: "invalid-token",
        password: mockPassword,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(userAuthMessage.invalidToken);
  });

  it("should return 400 if user is not found for the reset token", async () => {
    await ResetToken.create({
      user_id: mockUserId,
      token: mockResetToken,
    });

    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: mockResetToken,
        password: mockPassword,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(userAuthMessage.userNotFound);
  });

  it("should return 400 if the new password is reused", async () => {
    const user = await Users.create({
      email: "testuser@example.com",
      password: "OldPassword123",
      name: "Test User",
      password_history: [
        { password: await new Users().createPass(mockPassword), changedAt: Date.now() },
      ],
    });

    await ResetToken.create({
      user_id: user._id,
      token: mockResetToken,
    });

    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: mockResetToken,
        password: mockPassword,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(userAuthMessage.passwordReUse);
  });

  it("should return 400 if no token is provided", async () => {
    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        password: mockPassword,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe("\"token\" is not allowed to be empty"); // Adjust if you have a custom validation message
  });

  it("should return 400 if no password is provided", async () => {
    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: mockResetToken,
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe("\"password\" is not allowed to be empty"); // Adjust if you have a custom validation message
  });

  it("should handle database errors gracefully", async () => {
    jest.spyOn(ResetToken, "findOne").mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/users/auth/reset-password")
      .send({
        token: mockResetToken,
        password: mockPassword,
      });

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).toBe("Database error"); // Adjust if you use a different default error message
  });
});
