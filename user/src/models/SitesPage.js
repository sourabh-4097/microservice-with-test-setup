import mongoose from "mongoose";
import { sitesPageSchemaMessage } from "../message/message.js";
import Sites from "../models/Sites.js";

mongoose.set("strictQuery", true);

const SitePageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, sitesPageSchemaMessage.titleFieldIsEmpty],
  },
  sites_id: {
    type: mongoose.Schema.ObjectId,
    required: [true, sitesPageSchemaMessage.siteIdFieldIsEmpty],
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  time: {
    type: Number,
    default: Date.now,
  },
  url: {
    type: String,
    required: [true, sitesPageSchemaMessage.urlFieldIsEmpty],
  },
  total_checks: {
    type: Number,
  },
  optimized_checks: {
    type: Number,
  },
  progressing: {
    type: Boolean,
  },
  individual_progressing: {
    type: Boolean,
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  is_new_url: {
    type: Boolean,
  },
  ignore_url: {
    type: Boolean,
  },
  skipped_url: {
    type: Boolean,
  },
  not_scan: {
    type: Boolean,
  },
});

SitePageSchema.post("save", async function () {
  // Find the site in DB with this sites_id
  const sites = await Sites.findById(this["sites_id"]);
  sites["subpages_id"].push(this["_id"]);
  // Append subpage id in site data
  let updateSitesPayload = { subpages_id: [...new Set(sites["subpages_id"])] };
  const siteUpdate = await Sites.findByIdAndUpdate(
    this["sites_id"],
    updateSitesPayload
  );
});

export default mongoose.model("sites_page", SitePageSchema);
