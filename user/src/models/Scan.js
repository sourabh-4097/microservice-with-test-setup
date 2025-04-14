import mongoose from "mongoose";
import { scanSchemaMessage } from "../message/message.js";

mongoose.set("strictQuery", true);

const UsersSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
  },
  scan_url: {
    type: String,
    required: [true, scanSchemaMessage.scanUrlRequired],
    trim: true,
  },
  sitepage_id: {
    type: mongoose.Schema.ObjectId,
    ref: "sites_page",
  },
  with_keyword: {
    type: Boolean,
  },
  keyword: {
    type: String,
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  optimized_scan: {
    type: Array,
  },
  premium_scan: {
    type: Array,
  },
  location_code: {
    type: String,
    default: "",
  },
  audit_id: {
    type: mongoose.Schema.ObjectId,
    ref: "audit_scan",
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("Scan", UsersSchema);
