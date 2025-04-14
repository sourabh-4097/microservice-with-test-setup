import mongoose from "mongoose";
import {
  userSchemaMessage,
  invitationSchemaMessage,
} from "../message/message.js";
import validator from "validator";
mongoose.set("strictQuery", true);

const InvitationSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  slot_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Slots",
  },
  invitation_email: {
    type: String,
    required: [true, userSchemaMessage.emailFieldIsEmpty],
    validate: {
      validator: validator.isEmail,
      message: userSchemaMessage.emailIsNotValid,
    },
    unique: true,
  },
  invitation_code: {
    type: String,
  },
  status: {
    type: String,
    enum: invitationSchemaMessage.invitationValues,
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  updated_at: {
    type: Number,
    default: Date.now,
  },
});

export default mongoose.model("Invitation", InvitationSchema);
