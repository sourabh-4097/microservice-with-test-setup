import mongoose from "mongoose";
import validator from "validator";
import { userRoleType, userSchemaMessage } from "../message/message.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

mongoose.set("strictQuery", true);

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, userSchemaMessage.emailFieldIsEmpty],
    validate: {
      validator: validator.isEmail,
      message: userSchemaMessage.emailIsNotValid,
    },
    unique: true,
  },
  admin_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  intro_video_close: {
    type: Boolean,
  },
  onboarding: {
    type: Boolean,
    default: false,
  },
  onboarding_web: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
    select: false,
  },
  name: {
    type: String,
    required: [true, userSchemaMessage.nameFieldIsEmpty],
    trim: true,
  },
  quantity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: userSchemaMessage.quantityIsNotInteger,
    },
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  sites_id: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Sites",
    },
  ],
  isDeactivated: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: Object,
    default: {},
  },
  addons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "addon",
    },
  ],
  temp: {
    type: Boolean,
    trim: true,
  },
  team_size: {
    type: String,
    trim: true,
  },
  your_role: {
    type: String,
    trim: true,
  },
  role_type: {
    type: String,
    enum: userSchemaMessage.userRole,
    default: userRoleType.admin,
  },
  pdf_icon: {
    type: String,
    default: null,
    trim: true,
  },
  stripe_customer_id: {
    type: String,
    default: null,
    trim: true,
  },
  date_format: {
    type: String,
  },
  password_history: [
    {
      password: {
        type: String,
      },
      changedAt: {
        type: Number,
        default: Date.now,
      },
    },
  ],
  // active_session_token: {
  //   type: String,
  // },
  failed_login_attempts: {
    type: Number,
    default: 0,
  },
  last_failed_attempt_at: {
    type: Number, // Store as timestamp
  },
  is_market_place_user: {
    type: Boolean,
  },
  has_agreed_to_terms: {
    type: Boolean,
    default: false,
  },
});

// Pre-save hook to hash password and manage password history
UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Check if the new password is not among the last three used passwords
  const isReused = await this.isPasswordReused(this.password);
  if (isReused) {
    throw new Error("You cannot reuse any of your last three passwords");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Update password history
  const passwordHistoryEntry = {
    password: this.password,
    changedAt: Date.now(),
  };

  if (this.password_history.length >= 3) {
    this.password_history.shift(); // Remove the oldest password entry
  }
  this.password_history.push(passwordHistoryEntry);

  next();
});

UsersSchema.methods.createPass = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UsersSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UsersSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Method to check if the new password was used in the last three changes
UsersSchema.methods.isPasswordReused = async function (newPassword) {
  for (let i = 0; i < this.password_history.length; i++) {
    const isMatch = await bcrypt.compare(
      newPassword,
      this.password_history[i].password
    );
    if (isMatch) return true;
  }
  return false;
};

// Instance method to check if account is locked
UsersSchema.methods.isAccountLocked = function () {
  const MAX_FAILED_ATTEMPTS = 5;
  const LOCK_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  if (this.failed_login_attempts >= MAX_FAILED_ATTEMPTS) {
    const lockEndTime = this.last_failed_attempt_at + LOCK_TIME;
    if (Date.now() < lockEndTime) {
      return { isLocked: true, lockEndTime };
    } else {
      // Reset failed login attempts if lock time has passed
      this.failed_login_attempts = 0;
      this.last_failed_attempt_at = null;
      return { isLocked: false };
    }
  }
  return { isLocked: false };
};

export default mongoose.model("Users", UsersSchema);
