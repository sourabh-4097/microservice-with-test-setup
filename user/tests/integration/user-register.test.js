import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/Users";
import Invitation from "../../src/models/Invitation";

describe("User Register API", () => {
    it("should create a new user", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            isMember: false,
        });

        expect(response.status).toBe(201);
        expect(response.body.user.name).toBe("John Doe");
        expect(response.body.user.email).toBe("john@example.com");

        const user = await User.findOne({ email: "john@example.com" });
        expect(user).not.toBeNull();
    });

    it("should assign default role as admin if not provided", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Alice",
            email: "alice@example.com",
            password: "password123",
        });

        expect(response.status).toBe(201);

        const user = await User.findOne({ email: "alice@example.com" });
        expect(user.role_type).toBe("admin");
    });

    it("should register a marketplace user when utm is provided", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Mark",
            email: "mark@example.com",
            password: "password123",
            utm: "someMarketPlace",
        });

        expect(response.status).toBe(201);

        const user = await User.findOne({ email: "mark@example.com" });
        expect(user.is_market_place_user).toBe(true);
    });

    it("should set has_agreed_to_terms to true when provided", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Grace",
            email: "grace@example.com",
            password: "password123",
            hasAgreedToTerms: true,
        });

        expect(response.status).toBe(201);

        const user = await User.findOne({ email: "grace@example.com" });
        expect(user.has_agreed_to_terms).toBe(true);
    });

    it("should fail when registering with an already existing email", async () => {
        await request(app).post("/users/auth/create").send({
            name: "John",
            email: "john@example.com",
            password: "password123",
        });

        const already = await User.findOne({ email: "john@example.com" });
        await User.findByIdAndUpdate(already?._id, { temp: false });
        const response = await request(app).post("/users/auth/create").send({
            name: "Doe",
            email: "john@example.com",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("This email is already in use.");
    });

    it("should reject password reuse", async () => {
        const response1 = await request(app).post("/users/auth/create").send({
            name: "Jake",
            email: "jake@example.com",
            password: "password123",
        });

        const user = await User.findOne({ email: "jake@example.com" });

        const updatedPassword = "newpassword123";
        await User.findByIdAndUpdate(user._id, { password: updatedPassword });
        // user.password = updatedPassword;
        // await user.save();


        const response2 = await request(app).post("/users/auth/create").send({
            name: "Jake",
            email: "jake@example.com",
            password: "password123", // Reusing old password
        });

        expect(response2.status).toBe(500);
        expect(response2.body.message).toBe("You cannot reuse any of your last three passwords");
    });

    it("should fail when password is too short", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Short",
            email: "short@example.com",
            password: "abc",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`"password" length must be at least 8 characters long`);
    });

    it("should fail when email format is invalid", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Invalid",
            email: "invalidemail",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`"email" must be a valid email`);
    });

    it("should fail when required fields are missing", async () => {
        const response = await request(app).post("/users/auth/create").send({
            name: "Missing Email",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`"email" is not allowed to be empty`);
    });

    // it("should fail when an invited user is already registered", async () => {
    //     const invitedUser = await Invitation.create({
    //         invitation_email: "invite@example.com",
    //         admin_id: "adminId",
    //     });

    //     const response = await request(app).post("/users/auth/create").send({
    //         name: "Invited User",
    //         email: "invite@example.com",
    //         password: "password123",
    //         isMember: true,
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe("User is already invited");
    // });

    // it("should fail when terms are not agreed to", async () => {
    //     const response = await request(app).post("/users/auth/create").send({
    //         name: "No Terms",
    //         email: "noterms@example.com",
    //         password: "password123",
    //         hasAgreedToTerms: false, // User did not agree to terms
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe("You must agree to the terms");
    // });

    it("should handle large role and team size values", async () => {
        const longString = "a".repeat(255); // very long string
        const response = await request(app).post("/users/auth/create").send({
            name: "Big Team",
            email: "bigteam@example.com",
            password: "password123",
            role_type: longString,
            team_size: longString,
        });

        expect(response.status).toBe(201);
    });
});
