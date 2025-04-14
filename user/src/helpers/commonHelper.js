import AuditScan from "../models/AuditScan.js";
import Sites from "../models/Sites.js";
import { reportFilter, googleControllerMessage } from "../message/message.js";
import { urlMessage } from "../message/scraperMessage.js";
import { parse } from "node-html-parser";
import { sanitizeKeyword } from "./textUtils.js";
import Scan from "../models/Scan.js";
import { getCountryDetailsDFS } from "./dataForSeoCountry.js";
import { ENDPOINTS, PASSWORD, USERNAME } from "../config/keywordConfig.js";
import { axiosCommon } from "./axiosHelper.js";

/**
 * Calculate current and previous month's start and end dates based on the provided number of months.
 *
 * @param {number} month - The number of months to go back from the current date.
 * @returns {Object} An object containing the current and previous month date strings.
 */
const getCurrentAndPreviousDate = (month) => {
  // Current month start date
  let currentMonthStartDate = new Date();
  currentMonthStartDate.setMonth(currentMonthStartDate.getMonth() - month);
  currentMonthStartDate.setDate(currentMonthStartDate.getDate() - 3);
  currentMonthStartDate = currentMonthStartDate.toISOString().split("T")[0];

  // Current month end date
  let currentMonthEndDate = new Date();
  currentMonthEndDate.setMonth(currentMonthEndDate.getMonth());
  currentMonthEndDate.setDate(currentMonthEndDate.getDate() - 3);
  currentMonthEndDate = currentMonthEndDate.toISOString().split("T")[0];

  // pervious month start date
  let perviousMonthStartDate = new Date();
  perviousMonthStartDate.setMonth(
    perviousMonthStartDate.getMonth() - month - month
  );
  perviousMonthStartDate.setDate(perviousMonthStartDate.getDate() - 4);
  perviousMonthStartDate = perviousMonthStartDate.toISOString().split("T")[0];

  // pervious month end date
  let perviousMonthEndDate = new Date(currentMonthStartDate);
  perviousMonthEndDate.setDate(perviousMonthEndDate.getDate() - 1);
  perviousMonthEndDate = perviousMonthEndDate.toISOString().split("T")[0];

  return {
    currentMonthStartDate,
    currentMonthEndDate,
    perviousMonthStartDate,
    perviousMonthEndDate,
  };
};

/**
 * Determines a flag value based on the comparison of current and previous month position counts.
 *
 * @param {number} currentMonthPositionCounts - The position counts for the current month.
 * @param {number} previousMonthPositionCounts - The position counts for the previous month.
 * @returns {number} - Flag value:
 *   - 0: If current and previous position counts are equal.
 *   - 1: If current month position count is greater than the previous month.
 *   - 2: If current month position count is less than the previous month.
 */
const checkPositionCounts = (
  currentMonthPositionCounts,
  previousMonthPositionCounts
) => {
  let flag = 0;

  switch (true) {
    case currentMonthPositionCounts === previousMonthPositionCounts:
      flag = 0; // Flag 0 if current and previous position counts are equal
      break;
    case currentMonthPositionCounts > previousMonthPositionCounts:
      flag = 1; // Flag 1 if current month position count is grater than previous
      break;
    case currentMonthPositionCounts < previousMonthPositionCounts:
      flag = 2; // Flag 2 if current month position count is less than previous
      break;
    default:
      break;
  }
  return flag;
};

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const getCompareDateArray = async (
  month,
  userId = "",
  hostname = "",
  compare = ""
) => {
  let selectedDate = "";
  if (userId && hostname && compare) {
    let reportAggregation = [];
    if (compare === reportFilter.first_audit) {
      reportAggregation = [
        {
          $match: {
            user_id: userId,
            url: { $regex: hostname },
          },
        },
        {
          $lookup: {
            from: "audit_scans", // Target collection
            localField: "_id", // Field from the input documents (Sites)
            foreignField: "site_id", // Field from the documents of the "from" collection (AuditScan)
            as: "auditScans", // Output array field
          },
        },
        {
          $unwind: "$auditScans", // Deconstructs the auditScan array
        },
        {
          $project: {
            created_at: "$auditScans.created_at",
            audit_id: "$auditScans._id",
            url: 1,
          },
        },
        {
          $sort: {
            "auditScan.created_at": 1,
          },
        },
        { $limit: 1 },
      ];
      const sitedResponse = await Sites.aggregate(reportAggregation);
      selectedDate = sitedResponse[0]?.created_at;
    }

    if (compare === reportFilter.last_30) {
      let last30Day =
        new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;
      const sitedResponse = await Sites.findOne({
        user_id: userId,
        url: { $regex: hostname },
      });
      const auditResponse = await AuditScan.findOne({
        user_id: userId,
        site_id: sitedResponse?._id,
        created_at: { $lt: last30Day },
      }).sort({ created_at: -1 });
      selectedDate = auditResponse?.created_at;
    }
  }

  // Current month start date
  let currentMonthStartDate = new Date();
  currentMonthStartDate.setMonth(currentMonthStartDate.getMonth() - month);
  currentMonthStartDate.setDate(currentMonthStartDate.getDate() - 3);
  currentMonthStartDate = currentMonthStartDate.toISOString().split("T")[0];

  // Current month end date
  let currentMonthEndDate = new Date();
  currentMonthEndDate.setMonth(currentMonthEndDate.getMonth());
  currentMonthEndDate.setDate(currentMonthEndDate.getDate() - 3);
  currentMonthEndDate = currentMonthEndDate.toISOString().split("T")[0];

  // pervious month start date
  let perviousMonthStartDate = new Date();
  perviousMonthStartDate.setMonth(
    perviousMonthStartDate.getMonth() - month - month
  );
  perviousMonthStartDate.setDate(perviousMonthStartDate.getDate() - 4);
  perviousMonthStartDate = perviousMonthStartDate.toISOString().split("T")[0];

  // pervious month end date
  let perviousMonthEndDate = new Date(currentMonthStartDate);
  perviousMonthEndDate.setDate(perviousMonthEndDate.getDate() - 1);
  perviousMonthEndDate = perviousMonthEndDate.toISOString().split("T")[0];

  if (selectedDate) {
    // pervious month start date
    perviousMonthStartDate = new Date(selectedDate);
    perviousMonthStartDate.setMonth(perviousMonthStartDate.getMonth() - month);
    perviousMonthStartDate.setDate(perviousMonthStartDate.getDate());
    perviousMonthStartDate = perviousMonthStartDate.toISOString().split("T")[0];

    // pervious month end date
    perviousMonthEndDate = new Date(selectedDate);
    perviousMonthEndDate.setDate(perviousMonthEndDate.getDate());
    perviousMonthEndDate = perviousMonthEndDate.toISOString().split("T")[0];
  }

  return {
    currentMonthStartDate,
    currentMonthEndDate,
    perviousMonthStartDate,
    perviousMonthEndDate,
  };
};

const getPlanItems = (plans) =>
  plans?.find(
    ({ plan }) => plan?.metadata?.is_plan || plan?.metadata?.type === "plan"
  );

/**
 * Calculate month's start and end date based on the provided audit date.
 *
 * @param {String} auditDate - The audit date to get the month's start and end date.
 * @returns {Object} An object containing the month start and end date.
 */
const getMonitoringMonths = (auditDate) => {
  const month = googleControllerMessage.month;

  // Month start date
  let monthStartDate = new Date(auditDate);
  monthStartDate.setMonth(monthStartDate.getMonth());
  monthStartDate.setDate(monthStartDate.getDate() - 3);
  monthStartDate = monthStartDate.toISOString().split("T")[0];

  // Month end date
  let monthEndDate = new Date(auditDate);
  monthEndDate.setMonth(monthEndDate.getMonth() - month);
  monthEndDate.setDate(monthEndDate.getDate() - 3);
  monthEndDate = monthEndDate.toISOString().split("T")[0];

  return {
    monthStartDate,
    monthEndDate,
  };
};

/**
 * Update basic scan detail if premium keywords and keyword volume is greater than 0
 *
 * @param {Array} optimizeResponseArray Basic scan details array
 * @param {Array} getPremiumDetailsOptimize premium scan details array
 * @returns {Array} An array containing updated basic scan details array
 */
const removePremiumUrlCheck = async (
  optimizeResponseArray,
  getPremiumDetailsOptimize,
  keyword
) => {
  try {
    const keywordVolume = getPremiumDetailsOptimize.find(
      (item) => item.title === "Keyword Volume"
    );

    if (keywordVolume && keywordVolume.value > 0) {
      // Find the index of the "URL" object in optimizeResponseArray
      const urlObjectIndex = optimizeResponseArray.findIndex(
        (item) => item.title === "URL"
      );

      if (urlObjectIndex !== -1) {
        // Get the "URL" object from optimizeResponseArray
        const urlObject = optimizeResponseArray[urlObjectIndex];

        // Find the suggestion object with the specified string in the "URL" object
        const urlSuggestionObjectIndex = urlObject.suggestions.findIndex(
          (suggestion) =>
            suggestion.message.includes("make it between 3 and 6 words")
        );

        if (
          urlSuggestionObjectIndex !== -1 &&
          urlObject.suggestions.length === 1
        ) {
          // Create a copy of the "URL" object
          const updatedUrlObject = { ...urlObject };
          const inputString = updatedUrlObject?.suggestions[0]?.message || "";
          const regexMatch = inputString?.match(/\d+/);
          if (regexMatch.length) {
            let short = parseInt(regexMatch[0]);
            if (short > 6 && getKeywordWordCount(keyword) > 6) {
              // Remove the suggestion object from the "URL" object's suggestions array
              updatedUrlObject.suggestions.splice(urlSuggestionObjectIndex, 1);

              // Push the new item into the passSuggestions array
              updatedUrlObject.passSuggestions.push(
                urlMessage.urlWordCountPass
              );

              // Update passChecks count based on the length of passSuggestions array
              updatedUrlObject.passChecks =
                updatedUrlObject.passSuggestions.length;
              if (
                updatedUrlObject.passSuggestions.length ===
                updatedUrlObject.totalChecks
              ) {
                updatedUrlObject.successMessage =
                  urlMessage.successMessageKeyWordVolumeHigh;
              }

              // Replace the "URL" object in optimizeResponseArray with the updated one
              optimizeResponseArray[urlObjectIndex] = updatedUrlObject;
            }
          }
        }
      }
    }
    // Return the updated optimizeResponseArray
    return optimizeResponseArray;
  } catch (e) {
    // Return the updated optimizeResponseArray
    return optimizeResponseArray;
  }
};

const getKeywordWordCount = (text) => {
  return text && text.toLowerCase().replace(/-/g, " ").split(" ").length;
};

const parseRange = (inputString) => {
  if (inputString) {
    return inputString
      .split("-")
      .map((value) => parseInt(value.replace(/,/g, ""), 10));
  }
};

const commonResponse = (response) => {
  return response?.data?.tasks[0]?.result
    ? response?.data?.tasks[0]?.result[0]?.items
    : [];
};

const countWords = (keyword) => {
  return keyword.trim().split(/\s+/).length;
};

/**
 * Convert HTML string to DOMNode
 *
 * @param {string} stringHtml
 */
const domParserConvert = (stringHtml) => {
  try {
    let DomParser = parse(stringHtml || "");

    if (DomParser.querySelector(".cky-preference-center")) {
      DomParser.querySelector(".cky-preference-center").remove();
    }
    return DomParser;
  } catch (e) {
    return parse(stringHtml || "");
  }
};
const getUrlRegex = () => {
  return /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9àäåö-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
};

/**
 * Check if the URL contains '/shop' and if the DOM contains an element with the 'category-item' class.
 *
 * @param {string} url - The URL to check.
 * @param {string} dom - The HTML string of the DOM to check.
 * @returns {boolean} - Returns true if the URL contains '/shop' and the DOM contains an element with the 'category-item' class, otherwise false.
 */
const checkIsCategoryUrl = (url, dom) => {
  // Check if the URL contains '/shop'
  if (url.includes("/shop")) {
    // Check if the DOM contains an element with the 'category-item' class
    /* if (dom && dom.querySelector(".category-item")) {
      return true;
    } */
    if (dom && dom.querySelector("[class*='category-']")) {
      return true;
    }
  }
  return false;
};

/**
 * Makes a search volume request to DataForSEO API with retries if the request fails.
 *
 * @param {Object} finalPayload - The payload for the search volume request, containing location and keywords.
 * @param {number} [retries=0] - The number of retry attempts made so far.
 *
 * @returns {Promise<Array>} - Returns an array of results from the search volume API or an empty array if failed after retries.
 */
const makeSearchVolumeRequest = async (finalPayload, retries = 0) => {
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 2000;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    const searchVolumeRequest = {
      method: "post",
      url: ENDPOINTS.searchVolume,
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
      data: [finalPayload],
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axiosCommon(searchVolumeRequest);
    return response?.data?.tasks[0]?.result[0]?.items || [];
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await delay(RETRY_DELAY); // Wait before retrying
      return await makeSearchVolumeRequest(finalPayload, retries + 1);
    } else {
      return [];
    }
  }
};

/**
 * Updates keyword volumes for a specific audit based on DataForSEO API data.
 *
 * @param {string} auditId - The ID of the audit for which keyword volumes are being updated.
 * @returns {Promise<void|Array>} - Returns nothing on success, or an empty array if an error occurs.
 */
const updateKeywords = async (auditId) => {
  try {
    const nullVolumeData = await Scan.find(
      {
        audit_id: auditId,
        premium_scan: {
          $elemMatch: {
            title: "Keyword Volume",
            value: null,
          },
        },
        with_keyword: true,
      },
      "select id audit_id keyword location_code"
    );

    if (nullVolumeData?.length == 0) {
      return;
    }

    // Group keywords by location code
    const groupedData = {};
    let locationCodeData;

    nullVolumeData.forEach((item) => {
      let locationCode = item?.location_code;
      if (locationCode?.toLocaleLowerCase() === "global") {
        locationCode = "GB";
      }

      // Retrieve country details based on location code
      locationCodeData = getCountryDetailsDFS(locationCode);

      if (!locationCodeData) return;

      const locationId = locationCodeData?.locationId;

      if (!groupedData[locationId]) {
        groupedData[locationId] = [];
      }

      const sanitizedKeywords = sanitizeKeyword(item?.keyword);
      groupedData[locationId].push(sanitizedKeywords);
    });

    const allResponses = [];

    for (const locationId of Object.keys(groupedData)) {
      const finalPayload = {
        location_code: parseInt(locationId),
        keywords: groupedData[locationId],
        language_name: locationCodeData?.language_name,
      };

      const volumeResponse = await makeSearchVolumeRequest(finalPayload);

      if (volumeResponse.length > 0) {
        const mappedVolumeResponse = volumeResponse.map((item) => ({
          keyword: item?.keyword,
          searchVolume: item?.search_volume,
        }));

        // Store the response
        allResponses.push({
          locationId: locationId,
          data: mappedVolumeResponse,
        });
      }
    }

    nullVolumeData.forEach((item) => {
      const locationId = getCountryDetailsDFS(item?.location_code)?.locationId;

      allResponses.map(async (volume) => {
        volume?.data.map(async (key) => {
          if (
            item?.keyword?.toLowerCase() === key?.keyword?.toLowerCase() &&
            locationId == volume?.locationId
          ) {
            await Scan.updateOne(
              {
                "_id": item?._id,
                "premium_scan.title": "Keyword Volume",
              },
              {
                $set: {
                  "premium_scan.$.value": key?.searchVolume || null,
                },
              }
            );
          }
        });
      });
    });
  } catch (error) {
    return [];
  }
};

const subtractDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const getFilteredDateRange = (filterOption, createdAt = null) => {
  const today = new Date();
  let startDate, endDate;

  // Subtract N days from a given date
  const subtractDaysUTC = (date, days) => {
    const newDate = new Date(date);
    newDate.setUTCDate(newDate.getUTCDate() - days);
    return newDate;
  };

  // Set a date to 00:00:00 AM UTC
  const setToMidnightUTC = (date) => {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate;
  };

  // Set a date to 12:00:00 PM (noon) UTC
  const setToNoonUTC = (date) => {
    const newDate = new Date(date);
    newDate.setUTCHours(12, 0, 0, 0);
    return newDate;
  };

  // Calculate "two days ago" adjusted to midnight UTC
  const twoDaysAgo = subtractDaysUTC(today, 2);
  const adjustedTwoDaysAgo = setToMidnightUTC(twoDaysAgo);

  switch (filterOption) {
    case "past_7_days":
      startDate = setToMidnightUTC(subtractDaysUTC(adjustedTwoDaysAgo, 7));
      endDate = setToNoonUTC(adjustedTwoDaysAgo);
      break;
    case "last_28_days":
      startDate = setToMidnightUTC(subtractDaysUTC(adjustedTwoDaysAgo, 28));
      endDate = setToNoonUTC(adjustedTwoDaysAgo);
      break;
    case "last_3_months":
      const threeMonthsAgo = new Date(adjustedTwoDaysAgo);
      threeMonthsAgo.setUTCMonth(threeMonthsAgo.getUTCMonth() - 3);
      startDate = setToMidnightUTC(threeMonthsAgo);
      endDate = setToNoonUTC(adjustedTwoDaysAgo);
      break;
    case "last_12_months":
      const twelveMonthsAgo = new Date(adjustedTwoDaysAgo);
      twelveMonthsAgo.setUTCMonth(twelveMonthsAgo.getUTCMonth() - 12);
      startDate = setToMidnightUTC(twelveMonthsAgo);
      endDate = setToNoonUTC(adjustedTwoDaysAgo);
      break;
    case "since_seoSpace":
      if (createdAt) {
        const timeStamp = new Date(createdAt);
        startDate = setToMidnightUTC(subtractDaysUTC(timeStamp, 4));
      } else {
        startDate = null;
      }
      endDate = setToNoonUTC(adjustedTwoDaysAgo);
      break;
    default:
      startDate = null;
      endDate = null;
  }

  return {
    startDate: startDate ? startDate.toISOString().split("T")[0] : null,
    endDate: endDate ? endDate.toISOString().split("T")[0] : null,
  };
};

const formatToUSCurrency = (num) => {
  // Check if the input is null
  if (num === null) {
    return " ";
  }

  // Try to convert string to a number, if necessary
  const parsedNum = typeof num === "string" ? parseFloat(num) : num;

  // Check if the parsed number is a valid number
  if (isNaN(parsedNum)) {
    return num; // Return the original value if it's not a valid number (e.g., 'abc11')
  }

  // Format the number if it's valid
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(parsedNum);
};

export {
  getCurrentAndPreviousDate,
  checkPositionCounts,
  chunkArray,
  getCompareDateArray,
  getPlanItems,
  getMonitoringMonths,
  removePremiumUrlCheck,
  parseRange,
  commonResponse,
  countWords,
  domParserConvert,
  getUrlRegex,
  checkIsCategoryUrl,
  updateKeywords,
  getFilteredDateRange,
  subtractDays,
  formatToUSCurrency,
};
