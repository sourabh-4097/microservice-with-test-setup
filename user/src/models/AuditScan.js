import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const AuditScanSchema = new mongoose.Schema({
  site_id: {
    type: mongoose.Schema.ObjectId,
    ref: "sites",
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  re_audit: {
    type: Boolean,
    default: false,
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

export default mongoose.model("audit_scan", AuditScanSchema);
