// This file includes CRUD API for site collection
import Scan from "../models/Scan.js";
// import Site from "../models/Sites.js";
import SitesPage from "../models/SitesPage.js";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError } from "../errors/index.js";
// import { NotFoundError } from "../errors/index.js";
import { scanControllerMessage, defaultMessage } from "../message/message.js";
// import {
//   updateCount,
//   updateOptimizeScanCountIntoSubPages,
// } from "./subPagesController.js";
import AuditScan from "../models/AuditScan.js";
// import { reportFilter } from "../message/message.js";
// import { deleteToken } from "../helper/gscToken.js";
// import IgnoreImages from "../models/IgnoreImages.js";
import { removePremiumUrlCheck } from "../helper/commonHelper.js";
// import ProductDetails from "../models/ProductDetails.js";
// import SquareSpaceProductToken from "../models/SquareSpaceProductToken.js";
// import Sites from "../models/Sites.js";

/**
 * Create scan
 *
 * @param {Object} req for request payload
 * @param {*} res return callback
 */
const createScan = async (req, res) => {
  const {
    user_id,
    scan_url,
    with_keyword,
    keyword,
    created_at,
    optimized_scan,
    premium_scan,
    sitepage_id,
    location_code,
  } = req.body;
  const { adminData } = req.account;

  //find Sub page
  let subPageResponse = await SitesPage.findOne({
    _id: sitepage_id,
  });
  let auditScan;
  if (user_id && subPageResponse) {
    auditScan = await AuditScan.findOne({
      user_id: adminData?._id,
      site_id: subPageResponse.sites_id,
    }).sort({ created_at: -1 });
  }

  // Inserting data into site collection
  let scanPayLoad = {
    user_id: adminData?._id,
    scan_url,
    with_keyword,
    keyword,
    created_at,
    optimized_scan,
    premium_scan,
    sitepage_id,
    location_code,
    created_by: user_id,
  };
  if (auditScan) {
    scanPayLoad["audit_id"] = auditScan._id;
  }

  if (keyword) {
    const updatedOptimizedScan = await removePremiumUrlCheck(
      optimized_scan,
      premium_scan,
      keyword
    );
    scanPayLoad["optimized_scan"] = updatedOptimizedScan;
  }

  let response = await Scan.create(scanPayLoad);

  // Return success response
  res.status(StatusCodes.OK).json({
    status: defaultMessage.success,
    message: scanControllerMessage.scanInserted,
    scan: response,
  });
};

// /**
//  * Get scans
//  *
//  * @param {Object} req for request payload
//  * @param {*} res return callback
//  */
// const getScan = async (req, res) => {
//   const { userId } = req.user;
//   const { adminData } = req.account;
//   const adminId = adminData?._id;

//   // Get site collection
//   const request = {};
//   request[req.body.field] = req.body.value;
//   request["user_id"] = adminId;

//   let scanResponse = await Scan.find(request).sort({ created_at: -1 }).limit(2);
//   let siteResponse = null;
//   let ignoreImages = null;
//   let lastScanDate = null;
//   if (scanResponse.length) {
//     let subPageResponse = await SitesPage.findOne({
//       _id: scanResponse[0]?.sitepage_id,
//     });
//     siteResponse = await Site.findOne({ _id: subPageResponse?.sites_id });
//     // Fetch ignored images by user-id and subPage-id
//     ignoreImages = await IgnoreImages.findOne({
//       user_id: adminData?._id,
//       subpages_id: scanResponse[0]?.sitepage_id,
//     });
//     lastScanDate = subPageResponse?.time ? subPageResponse?.time : null;
//   }

//   res.status(StatusCodes.OK).json({
//     status: defaultMessage.success,
//     message: scanControllerMessage.subSiteGet,
//     scan: siteResponse ? scanResponse : [],
//     siteId: siteResponse ? siteResponse?._id : null,
//     ignoredImages: ignoreImages ? ignoreImages : {},
//     lastScanDate: lastScanDate,
//   });
// };

// /**
//  * Update scan
//  *
//  * @param {Object} req for request payload
//  * @param {*} res return callback
//  */
// const updateScan = async (req, res) => {
//   const { url, optimized_scan } = req.body;

//   const userId = req.account?.adminData?._id;

//   // Find scan data in db
//   let response = await Scan.find({
//     user_id: userId,
//     scan_url: url,
//   })
//     .sort({ created_at: -1 })
//     .limit(1);

//   // Update scan db
//   if (response.length) {
//     await Scan.findByIdAndUpdate(response[0]._id, {
//       optimized_scan: optimized_scan,
//     });

//     // Update sites count
//     let totalChecks = optimized_scan.length;
//     let optimizedChecks = optimized_scan.filter((data, index) => {
//       if (data?.suggestions?.length === 0) {
//         return data;
//       }
//     }).length;

//     let updatedSubSitesResponse = await SitesPage.findByIdAndUpdate(
//       response[0].sitepage_id,
//       {
//         total_checks: totalChecks,
//         optimized_checks: optimizedChecks,
//       }
//     );
//     // Update count in main sites
//     updateCount(updatedSubSitesResponse.sites_id);
//   }
//   // Return success response
//   res.status(StatusCodes.OK).json({
//     status: defaultMessage.success,
//     message: scanControllerMessage.scanUpdated,
//   });
// };

// /**
//  * Delete scan from given scanId
//  *
//  * @param {Object} req for request payload
//  *
//  * @param {*} res return callback
//  */
// const deleteScan = async (req, res) => {
//   try {
//     const scanId = req.params.id;

//     const userId = req.account?.adminData?._id;

//     // Check is params passed or not
//     if (!scanId || !userId) {
//       // if null then throw error
//       throw new BadRequestError(defaultMessage.validation);
//     }

//     // find all scan Id from scan collection by scanId and userId
//     const scanDetails = await Scan.findOne({ _id: scanId, user_id: userId });

//     if (!scanDetails) {
//       throw new NotFoundError(scanControllerMessage.scanNotFound);
//     }
//     let refresh = false;
//     // Delete all Scan data related to these scan Id
//     if (scanDetails) {
//       await Scan.deleteOne({ _id: scanId });
//       const moreScan = await Scan.find({
//         sitepage_id: scanDetails.sitepage_id,
//       });

//       const sitePageDetails = await SitesPage.findOne({
//         _id: scanDetails.sitepage_id,
//       });

//       if (moreScan.length === 0) {
//         // Delete site pages
//         await SitesPage.findByIdAndRemove(scanDetails?.sitepage_id);
//         let sitePagesLength =
//           (await SitesPage.findOne({
//             sites_id: sitePageDetails?.sites_id,
//           }).count()) || 0;
//         if (sitePagesLength === 0) {
//           refresh = true;

//           // Delete all tokens related to this user-id and url
//           await deleteToken(userId, scanDetails.scan_url);

//           await ProductDetails.deleteOne({
//             user_id: userId,
//             site_id: sitePageDetails.sites_id,
//           });

//           const site = await Sites.findById(sitePageDetails.sites_id);
//           await SquareSpaceProductToken.deleteOne({
//             ref_id: userId,
//             site_id: site?.squarespace_unique_id,
//           });
//           await Site.findByIdAndRemove(sitePageDetails.sites_id);
//         }
//       }

//       if (moreScan.length > 0) {
//         updateOptimizeScanCountIntoSubPages(
//           moreScan[0]?.optimized_scan,
//           moreScan[0]?.sitepage_id
//         );
//       }

//       updateCount(sitePageDetails?.sites_id);
//     }

//     res.status(StatusCodes.OK).json({
//       status: defaultMessage.success,
//       message: scanControllerMessage.scanDeleted,
//       refresh,
//     });
//   } catch (error) {
//     // return error response
//     throw new BadRequestError(error.message);
//   }
// };

// /**
//  * Fetches the latest and previous scan data for a given subpage ID using aggregation.
//  *
//  * @param {string} subpage_id - The subpage ID for which to retrieve scan data.
//  * @throws {Error} Throws an error if there's a problem with the aggregation or query.
//  * @returns {Promise<{latestScan: Object, previousScan: Object}>} A promise that resolves to an object
//  * containing the latestScan and previousScan data.
//  */
// const getLatestAndPreviousScan = async (subpage_id) => {
//   // Aggregate to fetch both latestScan and previousScan
//   const [latestAndPreviousScan] = await Scan.aggregate([
//     {
//       $match: { sitepage_id: subpage_id },
//     },
//     {
//       $sort: { created_at: -1 },
//     },
//     {
//       $group: {
//         _id: null,
//         scans: { $push: "$$ROOT" },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         latestScan: {
//           $cond: {
//             if: { $eq: [{ $size: "$scans" }, 0] }, // Check if scans array is empty
//             then: [],
//             else: { $arrayElemAt: ["$scans", 0] }, // Get the first element as latestScan
//           },
//         },
//         previousScan: {
//           $cond: {
//             if: { $eq: [{ $size: "$scans" }, 1] }, // Check if scans array has only one element
//             then: [],
//             else: { $arrayElemAt: ["$scans", 1] }, // Get the second element as previousScan
//           },
//         },
//       },
//     },
//   ]);

//   return latestAndPreviousScan;
// };

// /**
//  * Fetches the latest and previous scan data for a given subpage ID using aggregation.
//  *
//  * @param {string} subpage_id - The subpage ID for which to retrieve scan data.
//  * @throws {Error} Throws an error if there's a problem with the aggregation or query.
//  * @returns {Promise<{latestScan: Object, previousScan: Object}>} A promise that resolves to an object
//  * containing the latestScan and previousScan data.
//  */
// const getOnlyPreviousScanRecord = async (subpage_id, compare) => {
//   // Aggregate to fetch both latestScan and previousScan
//   let scanRecord = [];
//   if (compare == reportFilter.first_audit) {
//     scanRecord = await Scan.findOne({ sitepage_id: subpage_id }).sort({
//       created_at: 1,
//     });
//   }

//   if (compare == reportFilter.last_30) {
//     let last30Day = new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;
//     scanRecord = await Scan.findOne({
//       sitepage_id: subpage_id,
//       created_at: { $lt: last30Day },
//     }).sort({
//       created_at: -1,
//     });
//   }
//   return scanRecord || [];
// };

export {
  createScan,
//   getScan,
//   updateScan,
//   deleteScan,
//   getLatestAndPreviousScan,
//   getOnlyPreviousScanRecord,
};
