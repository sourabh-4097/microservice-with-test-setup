import { applicationENV } from "../message/message.js";

const KEYWORD_SUGGESTION_URL_STAGE =
  "https://staging.seospace.co/php/examples/Planning/AddKeywordPlan.php";
const KEYWORD_SUGGESTION_URL_PROD =
  "https://app.seospace.co/php/examples/Planning/AddKeywordPlan.php";

const DEV_DFS_CRED = {
  userName: "dev.pradeep891@gmail.com",
  password: "b729227116a0f78b",
};
const PROD_DFS_CRED = {
  userName: "hp@roughwatermedia.com",
  password: "399fc60c04876f52",
};
export const USERNAME =
  process.env.NODE_ENV === applicationENV
    ? PROD_DFS_CRED.userName
    : DEV_DFS_CRED.userName;
export const PASSWORD =
  process.env.NODE_ENV === applicationENV
    ? PROD_DFS_CRED.password
    : DEV_DFS_CRED.password;
export const LANGUAGE_NAME = "English";
export const KEYWORD_SUGGESTION_URL =
  process.env.NODE_ENV === applicationENV
    ? KEYWORD_SUGGESTION_URL_PROD
    : KEYWORD_SUGGESTION_URL_STAGE;

const DATAFORSEO_DOMAIN = "https://api.dataforseo.com/v3/";
const DATAFORSEO_LABS = DATAFORSEO_DOMAIN + "dataforseo_labs/google/";

export const ENDPOINTS = {
  relatedKeywords: DATAFORSEO_LABS + "related_keywords/live",
  intent: DATAFORSEO_LABS + "search_intent/live",
  domainAuthority: DATAFORSEO_DOMAIN + "backlinks/bulk_ranks/live",
  organicSearchTraffic: DATAFORSEO_LABS + "domain_rank_overview/live",
  organicKeywords: DATAFORSEO_LABS + "ranked_keywords/live",
  totalBackLinks: DATAFORSEO_DOMAIN + "backlinks/summary/live",
  keywordSuggestions: DATAFORSEO_LABS + "keyword_suggestions/live",
  searchVolume:
    DATAFORSEO_DOMAIN +
    "keywords_data/clickstream_data/dataforseo_search_volume/live",
};
export const OPEN_AI_SECRET_KEY =
  "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";
