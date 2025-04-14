import mongoose from "mongoose";
import { sitesSchemaMessage } from "../message/message.js";
import Users from "../models/Users.js";

mongoose.set("strictQuery", true);

const SitesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, sitesSchemaMessage.titleFieldIsEmpty],
    trim: true,
  },
  squarespace_unique_id: {
    type: String,
    required: [true, sitesSchemaMessage.uniqueFieldIsEmpty],
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    required: [true, sitesSchemaMessage.urlFieldIsEmpty],
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  total_optimized: {
    type: Number,
  },
  total_scanned: {
    type: Number,
  },
  sites_audit: {
    type: Boolean,
    default: false,
  },
  subpages_id: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "sites_page",
    },
  ],
  monitoring: {
    type: String,
    enum: ["Every Week", "Every Month"],
  },
  monitoring_time: {
    type: Number,
    default: Date.now,
  },
  active_status: {
    type: String,
    default: "",
  },
  total_sub_pages: {
    type: Number,
    default: 0,
  },
  total_scan_sub_pages: {
    type: Number,
    default: 0,
  },
  squarespace_disconnected: {
    type: Boolean,
    default: false,
  },
  disable_disconnect_popup: {
    type: Boolean,
    default: false,
  },
});

SitesSchema.post("save", async function () {
  // Find the user in DB with this user_id
  const user = await Users.findById(this["user_id"]);

  let SitesModalDetails = mongoose.model("Sites");
  const result = await SitesModalDetails.find({ user_id: this["user_id"] });
  const createdSiteIds = result.map((id) => id._id);
  // Append sites id in user data
  let updateUserPayload = { sites_id: [...new Set(createdSiteIds)] };
  const userUpdate = await Users.findByIdAndUpdate(
    this["user_id"],
    updateUserPayload
  );
});

export default mongoose.model("Sites", SitesSchema);
