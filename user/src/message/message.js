// Default message
export const defaultMessage = {
    success: "success",
    error: "error",
    validation: "Please provide all values",
    inValidationRequest: "Invalid request",
    pass: "pass",
    reAuthenticate: "reauthenticate",
    invalidCredentials: "Invalid credentials",
    wrongError: "Something went wrong while login, try again after sometime",
    freePlanPrivateProtectedError:
      "We've detected this page is draft or password-protected. Please make it live to scan, or upgrade to the Designer plan to scan draft/password-protected web pages.",
    commonSQSPPrivateProtectedPageError:
      "We have detected this site is private or password protected - please make it live to complete a site-wide audit, or skip this step to scan the site page-by-page using SEOSpace's plugin.",
    nonSqSpOperationError:
      "We have detected this site is not built on Squarespace. Please add a Squarespace site or contact support if there is a mistake.",
  };
  
  // Messages ( Success / Failure ) for the payment
  export const paymentMessage = {
    success: "success",
    error: "error",
    validation: "Please provide all values",
    planDetails: "Plans retrieve successfully",
    planPrice: "Plan details retrieve successfully",
    planNotFound: "Plan not found",
    couponInvalid: "Coupon code is invalid",
    customerNotFound: "Customer not found",
    subscriptionNotFound: "Subscription not found",
    subscriptionDetails: "Subscription retrieve successfully",
    subscriptionError: "Subscription is not updated",
    subscriptionSuccess: "Subscription is updated successfully",
    subscriptionUpgrade: "Your subscription is upgraded successfully",
    subscriptionDowngrade: "Your subscription is downgraded successfully",
    subscriptionErrorUpgrade: "Your subscription is not upgraded",
    subscriptionErrorDowngrade: "Your subscription is not downgraded",
    subscriptionCancel: "Your subscription has been cancelled",
    subscriptionCreated: "Subscription created successfully",
    wrongPin:
      "The card’s security code is incorrect. Check the card’s security code or use a different card.",
    cardError:
      "Something went wrong while updating your card, try again after sometime",
    carSuccess: "Your card is updated successfully",
    paymentMethodNotFound: "Payment method not found.",
    customerUpdate: "Customer update successfully.",
    getInvoice: "Successfully get invoice details",
    slotAddedSuccess: "Slot added successfully",
    cardDetailSuccess: "Successfully get card details",
    intervalMap: {
      year: "annual",
      month: "monthly",
    },
  };
  
  // User-role type
  export const userRoleType = {
    admin: "admin",
    member: "member",
  };
  // Validation messages for the user schema
  export const userSchemaMessage = {
    emailFieldIsEmpty: "Please provide email",
    emailIsNotValid: "Please provide valid email",
    nameFieldIsEmpty: "Please provide name",
    quantityIsNotInteger: "Quantity should be only in numbers",
    userRole: (() => {
      return Object.values(userRoleType);
    })(),
  };
  
  // Validation messages for the sites
  export const sitesControllerMessage = {
    siteInserted: "Sites successfully inserted",
    siteUpdated: "Sites successfully Updated",
    siteDeleted: "You have successfully removed the site.",
    siteDetails: "Sites Details",
    sitePageIdFieldIsEmpty: "Please provide site page id",
    scanDetails: "Successfully get scan details",
    activeStatus: "disabled",
    blogPostDetail: "Successfully get blog details",
  };
  
  // Validation messages for the site schema
  export const sitesSchemaMessage = {
    titleFieldIsEmpty: "Please provide title",
    uniqueFieldIsEmpty: "Squarespace unique site ID is required",
    urlFieldIsEmpty: "Please provide url",
  };
  
  // Validation messages for the sites pages schema
  export const sitesPageSchemaMessage = {
    titleFieldIsEmpty: "Please provide title",
    siteIdFieldIsEmpty: "Please provide Site id",
    urlFieldIsEmpty: "Please provide url",
    totalChecksFieldIsEmpty: "Please provide total checks",
    optimizedChecksFieldIsEmpty: "Please provide optimized checks",
    urlFieldIsEmpty: "Please provide url",
  };
  
  // Messages ( Success / Failure ) for the sites pages
  export const subPagesControllerMessage = {
    subSiteInserted: "Sites page successfully inserted",
    subSiteUpdated: "Sites page successfully Updated",
    subSiteDeleted: "Sites page successfully Deleted",
    subSiteGet: "Sites page details get successfully",
    subSiteIdFieldIsEmpty: "Page id is mandatory",
    subPageNotFound: "SubPage id not found",
  };
  
  // Validation messages for the user auth
  export const userAuthMessage = {
    success: "success",
    error: "error",
    alreadyRegistered: "This email is already in use.",
    emailPasswordRequired: "Email and Password are required...!",
    emailRequired: "Email is required...!",
    userCreate: "You have successfully registered...!",
    keywordRequired: "Keyword is required...!",
    urlRequired: "URL is required...!",
    forgotPasswordEmail:
      "The reset link has successfully sent to this email address.",
    login: "Successfully logged in",
    tokenRequired: "Token is required...!",
    tokenCheck: "Token is valid...!",
    invalidCredentials: "Invalid credentials",
    invalidTokenType: "Invalid token type received",
    invalidToken: "Invalid token received",
    tokenType: "Bearer",
    forgotPasswordEmailFailed: "unable to sent mail for forgot password...!",
    userNotFound: "There is no user with this email address.",
    passwordReset: "Your password has been changed successfully.",
    passwordOlder:
      "Your old password and your new password has the same, please enter a different password.",
    invalidOldPassword: "Current password is not correct",
    deactiveUser: "Your account is deactivated",
    wrongError: "Something went wrong while login, try again after sometime",
    notConnectSquareSpace:
      "We cannot find an account registered using this email address; please create an account, or contact support@seospace.co.uk with any problems..",
    alreadyConnectSquareSpace:
      "We’ve detected there’s already an account with this email address - please log in or contact support@seospace.co.uk.",
    successConnectedSquareSpace:
      "Your Squarespace account is successfully connected with SEOSpace.",
    alreadyRegisterSquareSpace: `You have already set up an "email and password" login - please login using this method first, and then connect your Squarespace account from within the "Profile" tab.`,
    invitedUser: "You are already invited by ",
    invitationNotFound: "Invitation not found",
    userConnectWithSquareSpaceButNoChangePassword:
      "You do not have a password to reset because you logged in with Squarespace. Please login with Squarespace to access your account.",
    alreadyFoundAccount: `We’ve found this Squarespace account is already connected to an SEOSpace account; please login or contact support@seospace.co.uk with any problems or questions.`,
    passwordReUse:
      "You cannot use any of your last 3 passwords. Please use a new one.",
    // forgotPasswordCommonErrorMessage:
    //   "You will receive an email if your entered email address is registered.",
    scopes: {
      marketPlaceSquareSpaceUser: "website.products",
      SquareSpaceUser: "profile.read",
    },
    utmKey: "sqsp",
    utmKeyOnboarding: "on_boarding",
    forgotPasswordCommonErrorMessage:
      "These credentials are incorrect - please try again, reset your password or <a href='mailto:support@seospace.co.uk'>contact support.</a>",
    updateProductTokenDetails: "Successfully updated the token details",
    squareSpaceDisconnect: "/api/v1/user/uninstall",
    squareSpaceTopic: "extension.uninstall",
    marketPlaceUsersCount: "Successfully added market place users count",
    acceptTAndCs: "Please accept SEOSpace’s T&Cs to continue.",
  };
  
  // Validation messages for the admin
  export const adminControllerMessage = {
    gotAllData: "Got all users data successfully",
    success: "success",
  };
  
  // Messages ( Success / Failure ) for the user
  export const userControllerMessage = {
    userDetailsFound: "User details successfully found",
    userDetailsNotFound: "User details not found",
    userUpdate: "You have successfully updated your profile details",
    getScan: "Get Scan Details",
    addTag: "Hire us tag sent successfully",
    addClickTag: "Clicked Course tag sent successfully",
    userDeactivated: "You have successfully deactivated your account.",
    updatedDateFormat: "Your date format has been changed successfully.",
  };
  
  // Validation messages for the scan schema
  export const scanSchemaMessage = {
    scanUrlRequired: "Please provide url",
  };
  
  // Validation messages for the scan controller
  export const scanControllerMessage = {
    scanInserted: "Scan successfully inserted.",
    subSiteGet: "Scan details get successfully.",
    scanUpdated: "Scan successfully updated.",
    scanDeleted: "You have successfully deleted this scan.",
    scanNotFound: "Scan not found.",
  };
  
  // Validation messages for the addon controller
  export const addonControllerMessage = {
    scanInserted: "Addon successfully inserted",
    subSiteGet: "Addon details get successfully",
    alreadyAdded: "Addon already inserted.",
    getAddon: "All Active and pending Addon details got successfully",
  };
  
  //add add on message
  export const addAddOns =
    "Your subscription scan is completed please add add-ons";
  export const newAddAddOns = "Your add-ons scan is completed please new add-ons";
  export const subscriptionExpired =
    "Your subscription is expired please renew your subscription";
  export const freePlanName = "free";
  
  //add ons status
  export const addOnsStatus = {
    active: "active",
    completed: "completed",
    pending: "pending",
  };
  
  // Plan name
  export const planStatus = {
    diy: "DIY",
    agency: "Agency",
    designer: "Designer",
    free: "Free",
  };
  
  // Re-audit scan limit
  export const reAuditScanLimit = {
    diy: 3,
    designer: 5,
  };
  
  // Affiliates message
  export const affiliatesMessage = {
    notFound: "Affiliates account not found",
    successMessage: "get affiliates successfully",
  };
  
  // Google controller message
  export const googleControllerMessage = {
    month: 1,
    getTokenUrl: "Successfully get URL",
    tokenStore: "Successfully store token",
    domainDetails: "Successfully get domain details",
    indexDetails: "Successfully get index details",
    tokenNotFound: "Token not found",
    sitesDetailsNotFound:
      "We are not able to find the website in this connected Google account. Please try again with a different one.",
    error: "Something went wrong please try again..!",
    recommendedPagesDetails: "Successfully get recommended pages",
    noRecommendedPagesDetails:
      "We did not find any pages to recommend. Please come again later.",
    wrongGSCForConnect:
      "The website you are scanning for is not found in the GSC account you have connected. Please connect with the correct GSC account and then try.",
    wrongSiteUrlConnect:
      "The website you are scanning for is not found in the GSC account you have connected. Please connect with the correct GSC account and then try.",
    gscNotConnect:
      "We can’t tell whether your website is appearing on Google - connect your Google Search Console to ensure you’re able to be shown on search engines.",
    clickDetails: "Successfully get click details",
    trafficDecreased:
      "Your web traffic from Google has decreased since last month.",
    trafficIncreased:
      "Great, your web traffic improved slightly in the past month - follow these recommendations to accelerate your traffic growth.",
    trafficGood: "You’re doing well! Keep using the SEOSpace plugin!",
    siteCreatedDateLessThanTwentyEightDays: `Your insights will be available 28 days after your first scan on a website. Keep scanning to grow your traffic, and use our resources to continue improving your SEO.
    You will receive an email when your insights are available.`,
    daysDetails: "Site Create days is less than 28 days.",
    tokenRevoked:
      "SEOSpace has disconnected from Google Search Console - please reconnect to allow SEOSpace to provide additional personalized recommendations.",
    recommendKeyDetails: "Successfully get recommended keys",
    topTenPositionKeywordCounts:
      "Successfully get top ten position keyword counts",
    topTenPositionKeywordCounts:
      "Successfully retrieve the top ten position keyword counts",
    monthlyTraffic: "Successfully get traffic details",
    noMonthlyData:
      "Google Search Console is still processing your website’s search data; please check again in a day or so.",
    reAuthenticateToGsc: "Connection issue with GSC. Please re-connect",
    graphDetails: "Successfully get the graph details",
  };
  
  // MailChimp tag name
  export const mailChimpTagsName = {
    freeAudit: "Free Audit",
    scanFreeOut: "Scans (free)",
    scanPaidOut: "Scans (paid)",
    hireUsTag: "Interested",
    inactiveUsersTwoWeeks: "2 weeks inactive",
    inactiveUsersThreeMonths: "3 months inactive",
    inactiveUsersSixMonths: "6 months inactive",
    clickedCourse: "Clicked Course",
  };
  
  // Open AI controller messages
  export const openAiController = {
    chatGptError:
      "ChatGPT couldn't respond right now - please try again later. Unfortunately, this can be due to server issues that are out of our control.",
    generateText: `Please ignore all previous instructions. Please respond only in the English language. You are a keyword research and SEO expert who speaks and writes fluent English. Do not repeat yourself. Do not self-reference. Do not explain what you are doing. Below I have listed 50 keywords I currently rank for. I want to rank for new keywords. Analyse the below keywords to get an understanding of my topical map, and then suggest 10 blog posts that I should add to my website to boost my topical authority, rank for keywords I don't already rank for and attract target customers. These blog posts should be in a table, with a 50-60 character title, 150-160 character SEO meta description, URL slug and secondary keywords. Ensure that the blogs you suggest do not compete with the keywords I already rank for. They should be new topics that don't cause keyword cannibalization.`,
    generateBlogPostText: `You are an SEO expert who understands how to do keyword research, NLP analysis and SEO better than anyone else in the world. You’re able to analyse keywords a site is currently ranking for and come up with blog titles that would rank for related keywords that wouldn’t compete with the current keywords the site is ranking for. I.e. you understand and know how to avoid keyword cannibalization.
  Below is a description of my business, detailing my target customers, their pain points and goals - you should use this to customise the blog post suggestions to me, and make them as helpful as possible.
  
  BUSINESS DESCRIPTION:
  BUSINESS_DESCRIPTION
  
  In order to make this even more accurate, please analyse my homepage to understand my business even better HOMEPAGE_URL and the 3 below competitors.
  BUSINESS_COMPETITORS
  Below are the current keywords my site ranks for. Give me at least 10 blog post titles, meta descriptions, secondary keywords and URL slugs in a table format that I can add to my website that will allow me to rank for other keywords that aren’t in this list and boost my topical authority in my niche
  
  The blog post titles should be 50-60 characters long, the meta descriptions should be 150-160 characters long, and you should include 5 secondary keywords. Do not give me anything else other than the table - don’t give me a section of text beforehand and do not repeat the blog posts suggestions - they shouldn’t be the same, nor should they compete with each other.
  
  Make sure the blog posts don’t compete with any of the keywords I already rank for and DO NOT give me any other text in your reply other than the table, otherwise, you lose a life. I.e. do not suggest blog titles that include keywords I already rank for - this will hurt this websites SEO as the blogs will compete with existing pages - the suggested blog posts should only rank me for NEW keywords that I don't rank for - use your knowledge to find topics around what I already rank for to attract new website visitors/customers.
  
  Because these are blog posts you’re going to suggest, I don’t want them to rank for commercial or transactional keywords - they should only rank for informational keywords my target customers search for - don’t provide anything other than what will attract my target customers for informational keywords they search.
  
  Additionally, I want you to ignore any business names - only focus on informational keywords, not commercial, navigational or transactional.`,
    generateBlogPost:
      "Thanks for completing your business details; you can now generate blog post ideas.",
    generateBlogPostBrief: "Successfully generated blog post brief information",
    blogPostPrompt1: `You are an SEO expert who understands how to do keyword research, NLP analysis and SEO better than anyone else in the world. Below, is a list of keywords this website ranks for: WEBSITE:
  
  KEYWORDS.
  
  Below, I have listed informational keywords that my competitors rank for - all I want you to do, is analyse the keywords the above site ranks for, and list out keywords that the below competitors rank for, that the above site doesn’t. Remove any duplicates - just list me keywords that the below sites/competitors rank for, that the above site doesn’t. \n`,
  
    blogPostPrompt2: `You are an SEO expert who understands how to do keyword research, NLP analysis and SEO better than anyone else in the world. You’re able to analyse keywords a site is currently isn’t for and come up with blog post ideas that will rank for these keywords, as well as new keywords that are related to them.
  
  Below is a description of my business, detailing my target customers, their pain points and goals - you should use this to customise the blog post suggestions to me, and make them as helpful as possible.
  
  BUSINESS DESCRIPTION:
  
  BUSINESS_DESCRIPTION
  
  In order to make this even more accurate, please analyse my homepage to understand my business even better HOMEPAGE_URL and the 3 below competitors.
  
  BUSINESS_COMPETITORS
  
  Below are the current keywords that my competitors rank for, that I don’t. Give me at least 10 blog post titles, meta descriptions, secondary keywords and URL slugs in a table format that I can add to my website that will allow me to rank for other keywords that aren’t in this list and boost my topical authority in my niche
  
   OUTPUT FROM PROMPT 1 
  
  The blog post titles should be 50-60 characters long, the meta descriptions should be 150-160 characters long, and you should include 5 secondary keywords. Do not give me anything else other than the table - don’t give me a section of text beforehand and do not repeat the blog posts suggestions - they shouldn’t be the same, nor should they compete with each other.
  
  Because these are blog posts you’re going to suggest, I don’t want them to rank for commercial or transactional keywords - they should only rank for informational keywords my target customers search for - don’t provide anything other than what will attract my target customers for informational keywords they search.
  
  Additionally, I want you to ignore any business names - only focus on informational keywords, not commercial, navigational or transactional.`,
  
    blogPostPrompt3: `You are an SEO expert who understands how to do keyword research, NLP analysis and SEO better than anyone else in the world. You’re able to get given keywords, and create the best, most comprehensive blog post brief, that would allow a writer to write the perfect blog post to rank for a keyword. The blog post title I want help with is “Blog post title from selected row“ and here are the keywords “Enter keywords from that row”
  
  This blog post brief will contain everything I will ever need to outrank the competition, with an updated blog with fresh content.
  
  In order to do this, below, I have added the top competitors for this keyword - I want you to analyse them and systematically figure out what they do, and how to beat them.
  
  You must do this better than anyone else in the world.
  
  LIST COMPETITORS ADDED BY USER.
  
  To help here, I have also given a description of my business, detailing my target customers, their pain points and goals - you should use this to customise the blog post brief to me, and make it as helpful as possible.
  
  BUSINESS DESCRIPTION
  
  Once you have analysed the competitors (please visit their websites), I want you to write the brief. The brief must be well formatted in plain text (just list things you) and include (but not limited to): The primary keyword, secondary keywords, target audience, content goal, suggested SEO title (should be 50-60 characters long), suggested SEO description (should be 150-160 characters long), suggested URL slug (don’t include a date in the URL), competition, FAQs to include and anything the blog post must include, including topics and anything else to boost the chances of ranking.
  
  Don’t give me anything else other than the content of the brief. The brief should be in a easy to understand list format, with clear headings.`,
  
    totalBlogLimit: 3,
    reachedBlogPostLimit:
      "Your daily blog post generation limit has been exceeded.",
    businessDescriptionLimit:
      "Business description exceeds the maximum limit of 1000 characters.",
  
    commonAiText: `Web page content:`,
  
    commonKeywordAiText: `as a string - i.e. all next to each other, exactly as entered.\n`,
  
    metaDescription: {
      baseText: `You are a Squarespace SEO expert who understands how to write SEO/meta descriptions better than anyone else in the world. You have perfect US English (if the content on the web page is UK English or a different language, then auto detect and write accordingly), know all SEO best practices for Squarespace, and can read a web page, and write an SEO/meta description for it that clearly explain what the page is, follow SEO best practices and match the copywriting, tone and feel already on the page, and are click-worthy when displayed on search engines.
      
      Below is the content on the web page`,
  
      analysisText: `- please analyse this text to understand what the page is about, and then give me the best possible meta description for this page.
      
      Here are the criteria that these SEO/meta descriptions must follow - NEVER provide a SEO/meta descriptions variation that doesn’t fit these:
    
      The SEO/meta descriptions must be 150-160 characters long
      
      The SEO/meta descriptions must be engaging, and match the sort of content already on the web page
      
      The SEO/meta descriptions must match the tone selected: `,
  
      finalText: `\nDo not self reference, or give me any other text other than the SEO/meta description that match the above criteria perfectly. Before giving me your answer, please triple check that it meets all criteria, particularly the length - if it doesn’t, don’t give me an answer until the variations meet all criteria.`,
    },
  
    metaDescriptionWithKeyword: {
      analysisText: `- please analyse this text to understand what the page is about, and then give me the best possible SEO/meta description for this page.
      
      Here are the criteria that these SEO/meta descriptions must follow - NEVER provide a SEO/meta descriptions variation that doesn’t fit these:
      
      The SEO/meta descriptions must be 150-160 characters long - don’t give me one that’s 130 characters, or 170 characters - they should only ever be exactly between 150 and 160 characters, or you lose a life.
      
      The SEO/meta descriptions must be engaging, and match the sort of content already on the web page
      
      The SEO/meta descriptions must match the tone selected: `,
    },
  
    metaDescription2Prompt: `Please provide a SEO/meta description that is exactly 150-160 characters long for the webpage content provided - the one you just gave me isn’t in that range. Ensure the description is engaging, matches the tone of the content, and adheres to SEO best practices. Do not include any additional text in your response—only the SEO/meta description within the specified character range.
  
  Before responding, check your response, and ensure it’s the right length - if it isn’t go back to the drawing board and rewrite it until it is.`,
  
    SecondPromptWithKeyword1Text: `Please provide a SEO/meta description that is exactly 150-160 characters long and contains the keyword`,
    SecondPromptWithKeyword2Text: `as a string for the webpage content provided - the one you just gave me doesn’t fit that criteria. Ensure the description is engaging, matches the tone of the content, and adheres to SEO best practices. Do not include any additional text in your response—only the SEO/meta description within the specified character range.
  
  Before responding, check your response, and ensure it’s the right length and contains the keyword - if it isn’t go back to the drawing board and rewrite it until it is.`,
    metaDescription3Prompt: `The SEO description you just gave me is not 150-160 characters long - rewrite it to fit perfectly within my requirements - do not respond with any other text than a 150-160 character SEO description.`,
  
    metaDescriptionWithKeywordAiText: `The SEO/meta descriptions MUST contain this keyword`,
  
    getMetaDescription: "Meta description found successfully",
  
    h1: {
      baseText: `You are a Squarespace SEO expert who understands how to write H1 (page headings) better than anyone else in the world. You have perfect US English (if the content on the web page is UK English or a different language, then auto detect and write accordingly), know all SEO best practices for Squarespace, and can read a web page, and write 3 H1 suggestions for it that clearly explain what the page is, follow SEO best practices and match the copywriting, tone and feel already on the page.
      
      Below is the content on the web page`,
  
      analysisText: `- please analyse this text to understand what the page is about, and then give me 3 H1 variations that I could add.
    
      Here are the criteria that these H1s must follow - NEVER provide a H1 variation that doesn’t fit these:
    
      The H1 must be 40-60 characters long - don’t give me one that’s 30 characters, or 70 characters - they should only ever be exactly between 40 and 60 characters long, or you lose a life.
      
      The H1 must be engaging, and match the sort of content already on the web page
      
      The H1 must match the tone selected:`,
  
      finalText: `\nDo not self reference, or give me any other text other than the 3 H1 variation options that match the above criteria perfectly.`,
  
      withKeywordAiText: `The H1 MUST contain this keyword.`,
    },
  
    getH1s: "H1s found successfully",
  
    seoTitle: {
      baseText: `You are a Squarespace SEO expert who understands how to write SEO titles better than anyone else in the world. You have perfect US English (if the content on the web page is UK English or a different language, then auto detect and write accordingly), know all SEO best practices for Squarespace, and can read a web page, and write 3 SEO titles suggestions for it that clearly explain what the page is, follow SEO best practices and match the copywriting, tone and feel already on the page, and are click-worthy when displayed on search engines.
    
      Below is the content on the web page`,
  
      analysisText: `- please analyse this text to understand what the page is about, and then give me 3 SEO title variations that I could add.
      
      Here are the criteria that these SEO titles must follow - NEVER provide a SEO title variation that doesn’t fit these:
      
      The SEO title must be 50-60 characters long - don’t give me one that’s 30 characters, or 70 characters - they should only ever be exactly between 50 and 60 characters long, or you lose a life.
      
      The SEO title must be engaging, and match the sort of content already on the web page
      
      The SEO title must match the tone selected:`,
  
      finalText: `\nDo not self reference, or give me any other text other than the 3 SEO title variation options that match the above criteria perfectly.`,
  
      withKeywordAiText: `The SEO title MUST contain this keyword.`,
  
      seoTitle2Prompt: `Please provide a SEO title that is exactly 50-60 characters long for the webpage content provided - the one you just gave me isn’t in that range. Ensure the title is engaging, matches the tone of the content, and adheres to SEO best practices. Do not include any additional text in your response—only the SEO/seo title within the specified character range.
  
      Before responding, check your response, and ensure it’s the right length - if it isn’t go back to the drawing board and rewrite it until it is.`,
  
      SecondPromptWithKeyword1Text: `Please provide a SEO title that is exactly 50-60 characters long and contains the keyword`,
  
      SecondPromptWithKeyword2Text: `as a string for the webpage content provided - the one you just gave me doesn’t fit that criteria. Ensure the title is engaging, matches the tone of the content, and adheres to SEO best practices. Do not include any additional text in your response—only the SEO title within the specified character range.`,
  
      seoTitle3Prompt: `The SEO title you just gave me is not 50-60 characters long - rewrite it to fit perfectly within my requirements - do not respond with any other text than a 50-60 character SEO title.`,
    },
    getSeoTitles: "SEO titles found successfully",
  
    insights: {
      baseText: `I want to give someone advice for them to improve their SEO - I want the advice to be extremely actionable, easy to follow and something so good, they'd think, "wow, I'd pay for this advice" 
  
  My audience is a Squarespace user - you can learn specifically about their business using the information I give you later - in general, they won't be SEO experts - they will be beginners to intermediates - so the advice should be jargon-free, but extremely actionable. 
  
  For context, the outcome of this prompt will be displayed in my plugin, SEOSpace, the SEO plugin for Squarespace - the plugin will already be giving them a checklist to follow, and the purpose of the output of this prompt is to give them advice outside of the basic SEO advice you can find elsewhere - it should be extremely tailored to them, as if they have an SEO expert sitting on their shoulder giving them advice. It should also auto-detect their language and provide recommendations in their language (i.e. UK or US English, German, French, etc.).
  
  our response also shouldn't include any context - just give the guidance - just intro it to say this is personalized advice for the user - don't reference the prompt you've been given. 
  
  Below, I have included the advice included in SEOSpace's output - I'm including this because the reader of the output of this prompt will have already received advice on these things, so you should only provide advice outside of this: 
  - SEO titles and descriptions 
  - Broken links 
  - Image compression and alt tags 
  - SSL certificates 
  - Thin content 
  - URL optimization 
  
  The output of this shouldn't give anything else other than said advice - it shouldn't self reference. 
  
  Additionally, it should be tailored to the content on this webpage`,
  
      analysisText: `- I've added the text below for convenience:`,
  
      finalText: `The ideal outcome is you present well structured advice, that wows them, and is so specific to their web page and website, that they want to reach out to say thank you and think "Wow, I can't believe how helpful this is - I know exactly what to do now`,
  
      insightsUrl: "Page URL:",
      withKeywordBaseText: `Please ignore all previous prompts and information - do not self-reference.
      You are an SEO expert who specialises in Squarespace SEO; your role is to provide sophisticated, actionable SEO recommendations that help webpages rank higher on Google. Your analysis should deliver strategies that go beyond the basic SEO checklist provided to users, offering insights that can markedly enhance their website's search engine visibility. Every single one of these suggestions need to be super actionable - someone should be able to read it and instantly take action using only your output - someone should never be left thinking "what do I do now?" - particularly given most people will be beginners.
  
  You should almost act as an SEO consultant on someone's shoulder - providing only actionable insights.
  
  Instructions for Specific SEO Recommendations:
  
  Sentence Optimization:
  
  Identify specific sentences within the content that are poorly optimized for SEO.
  
  Provide suggested variations of these sentences that incorporate SEO best practices, enhancing readability and keyword integration without sacrificing the natural flow of the language.
  
  Content Refresh Strategy:
  
  Pinpoint sections where the content appears outdated, less relevant or contains incorrect information
  
  Offer detailed recommendations on how to update these areas, such as, but not limited to, integrating the latest industry data, adding recent case studies, or aligning with new SEO trends. Clearly specify exactly where and how these updates should be implemented within the content.
  
  Long-Tail Keyword Integration:
  
  Analyze the content for potential keyword opportunities that are currently overlooked.
  
  Suggest specific long-tail keywords that are relevant to the current content and search trends within the niche. Provide explicit instructions on where these keywords should be inserted in the content to optimize SEO effectively.
  
  Engagement Enhancement Techniques:
  
  Assess the current user engagement levels and identify areas for improvement.
  
  Recommend specific interactive elements or content enhancements that can increase user engagement. For example, but not limited to, suggest adding a quiz related to the content, embedding a video tutorial, or setting up a lead generation form that offers a free guide or newsletter signup to keep visitors engaged. Whatever you suggest should be relevant, don't just throw it out there if it isn't relevant
  
  Advanced SEO Strategies:
  
  Explore emerging trends, innovative techniques, or often-overlooked opportunities that could provide a competitive edge.
  
  Provide insights into implementing these strategies, such as, but not limited to, optimizing for voice search by including question-based content, using AI tools for content generation, or enhancing mobile usability for better performance in mobile-first indexing.
  
  Format and Delivery:
  
  Output Expectations: Deliver your insights in a clear, concise bullet-point format. Each recommendation should be actionable and detailed, aimed at improving specific aspects of the webpage's SEO - just like you are an SEO consultant giving direct, specific and actionable advice - only give a suggestion if it’s actually going to help and provides value
  
  Language and Clarity: Ensure all advice is articulated in simple, jargon-free language that is easy for users to understand and implement.
  
  Focus on Actionability: All recommendations should be practical, with clear instructions on how they can be immediately applied within the Squarespace platform to enhance SEO performance.
  
  Target keyword:`,
  
      withKeywordAnalysisText: `and deliver concise, 100-200 word insights tailored to help improve their ranking for the keyword`,
  
      withKeywordAiText: `Your advice should be specific, clear, and jargon-free, giving users practical steps they can implement immediately to improve their SEO performance.`,
    },
    getInsights: "Insights found successfully",
  };
  
  //Active log controller messages
  export const activeLogController = {
    getUsersLog: "Get users active logs of today and current month",
    inactiveUsersTwoWeeks: 14,
    inactiveUsersThreeMonths: 3,
    inactiveUsersSixMonths: 6,
    twoWeeksAgo: 14 * 24 * 60 * 60 * 1000,
    threeMonthsAgo: 90 * 24 * 60 * 60 * 1000,
    sixMonthsAgo: 180 * 24 * 60 * 60 * 1000,
  };
  
  // Chat GPT Modal
  export const gpt35Modal = "gpt-3.5-turbo";
  export const gpt40Modal = "gpt-4";
  export const textDavinci003Modal = "gpt-3.5-turbo-instruct";
  
  // Chat GTP Tone
  export const tonsMessage = {
    metaDescription: {
      "professional": "The tone of the meta description should be professional.",
      "click-worthy":
        "The tone of the meta description should be slightly click-worthy.",
      "soft":
        "The tone of the meta description should be soft, and not too pushy.",
      "neutral":
        "The tone of the meta description should be neutral - not too pushy or salesy and not too soft.",
    },
    seoTitle: {
      "professional": "The tone of the SEO title should be professional.",
      "click-worthy":
        "The tone of the SEO title should be slightly click-worthy.",
      "soft": "The tone of the SEO title should be soft, and not too pushy.",
      "neutral":
        "The tone of the SEO title should be neutral - not too pushy or salesy and not too soft.",
    },
    h1: {
      "professional": "The tone of the H1 should be professional.",
      "click-worthy": "The tone of the H1 should be slightly click-worthy.",
      "soft": "The tone of the H1 should be soft, and not too pushy.",
      "neutral":
        "The tone of the H1 should be neutral - not too pushy or salesy and not too soft.",
    },
  };
  
  // Individual scan controller messages
  export const individualScanControllerMessage = {
    scanIdFieldIsEmpty: "Please provide scan id",
    scanNotFound: "Scan not found.",
    scanDeleted: "Scan deleted successfully.",
    individualSiteOptimizeChecker: "Individual site successfully created.",
    getIndividualScan: "Successfully get the individual scan details",
    checkIndividualScan:
      "This url is already in site-audit. Please add different url",
  };
  
  // Audit scan controller messages
  export const auditScanController = {
    urlValidation: "You haven't selected any subPages",
    getAuditUrl: "Successfully get the audit urls",
    auditOptimize: "Your site-wide SEO audit will now start!",
    auditOptimizeError: "Couldn't added site and sub pages",
    getAuditSites: "Successfully get the audit site details",
    auditType: "Please provide audit type",
    siteNotFound: "Site not found",
    subPageIdNotFound: "No sub-page id found from the given site-id",
    auditStatus: "Successfully get the audit status",
    exceedLimit: `You have used up all of your site audit slots - please upgrade your account to access more site slots, or delete a site from within "Actions".`,
    urlFieldIsEmpty: "Please provide url",
    siteIdFieldIsEmpty: "Please provide site id",
    siteDetails: "Site details received",
    siteUpdated: "Site updated successfully",
    auditCheckersCount: "Successfully get list checkers counts",
    getScansByIssues: "Successfully get scans details by their issue",
    runAuditScanProcess: "Successfully audit scan",
    reAuditProgressing:
      "Your automatic site monitoring is in progress. Please initiate your site audit after some time.",
    reAudit: "Site re-audited successfully",
    stopAudit: "Audit stopped successfully.",
    alreadyExits:
      "You have already added this site to a site audit slot - please re-audit this site instead.",
    draftedSite: "This site has been successfully drafted",
    warningSiteMsg:
      "Our server is currently facing a higher than usual demand. To prevent overloading the server, please retry adding your site audit in ~5 minutes time. Apologies for any inconvenience caused.",
    limitUrlMsg:
      "You can scan minimum pages as we are currently experiencing heavy server load",
    skippedUrls: "Successfully get skipped urls",
    getAuditRestrictions: "Successfully get audit restrictions",
    gscNotConnected: "gsc not connected",
    blogPost: "Suggested blog posts",
    monitoringCompleted: "Your monitoring process has been completed",
    indexedChecks: "Indexed checks updated successfully",
  };
  
  // Report controller messages
  export const reportController = {
    siteIdFieldIsEmpty: "Please provide site id",
    generateSiteDetailPdf: "Successfully generated site detail pdf",
  };
  
  // Slot status for slot schema
  export const slotStatus = {
    available: "available",
    used: "used",
  };
  
  // Messages for the slots schema
  export const slotSchemaMessage = {
    slotValues: (() => {
      return Object.values(slotStatus);
    })(),
  };
  
  // Slot status for slot schema
  export const slotListStatus = {
    available: "available",
    invited: "invited",
    used: "used",
  };
  
  // Messages for the slots schema
  export const slotListSchemaMessage = {
    slotListValues: (() => {
      return Object.values(slotListStatus);
    })(),
  };
  
  // Invitation status for invitation schema
  export const invitationStatus = {
    pending: "pending",
    accepted: "accepted",
    available: "available",
    sent: "sent",
  };
  
  // Messages for the invitation schema
  export const invitationSchemaMessage = {
    invitationValues: (() => {
      return Object.values(invitationStatus);
    })(),
  };
  
  // Member controller messages
  export const memberControllerMessage = {
    alreadyExits: "Email already in use",
    memberIdIsEmpty: "Please provide member id",
    memberDeleted: "The member has been successfully removed.",
    notPermitted: "You do not have permission to delete this member!",
  };
  
  // Slots controller messages
  export const slotsControllerMessage = {
    invitedUser: "invited",
    slotUsed: "used",
    slotIdIsEmpty: "Please provide slot id",
    siteIdsIsEmpty: "Please provide site ids",
    slotsCreated: "Slots created successfully",
    getAllSlots: "Successfully get all slots",
    slotDeleted: "The slot has been successfully removed.",
    slotNotFound: "Slots not found",
  };
  
  // Slots controller messages
  export const invitationControllerMessage = {
    invitationEmailIsEmpty: "Please provide slot id & invitation email",
    userInvited: "The user has been invited successfully.",
    slotIdIsEmpty: "Please provide slot id",
    userExists:
      "The invited email address is already registered on SEOSpace. Please try a different one.",
    invitationDeleted: "The invitation has been successfully cancelled.",
    resendInvitation: "The invitation has been successfully resent.",
    invitationNotFound: "Invitation not found",
    noSlotAvailable: "No slot available for invite user",
    invitedUser:
      "Your invited user will receive an email to set up their account.",
  };
  
  export const leadGenerateControllerMessage = {
    requiredLeadFormDetails: "Please provide your form details",
    leadFormCreated: "Thank you for sharing your details.",
    getLeadForm: "Successfully get the lead form",
    leadCreated: "Successfully created the lead",
    leadDetails: "Successfully retrieve the lead details",
    leadIdIsEmpty: "Please provide lead id",
    leadDeleted: "The lead has been deleted successfully",
  };
  
  export const ignoreImagesControllerMessage = {
    ignoreImagesInserted: "Successfully inserted an ignored images",
  };
  
  export const keywordResearchController = {
    getBulkKeywordDifficulty: "Successfully get the keyword overview details",
    getRelatedKeywords: "Successfully get the related keywords",
  };
  
  export const keywordOverviewStatus = {
    covered: "covered",
    notCovered: "not covered",
  };
  
  export const competitorAnalysisController = {
    getCompetitorDetails: "Successfully get the competitor details",
    getTopOrganicKeywords: "Successfully get the top organic keywords",
    invalidCompetitor: "Invalid competitor",
  };
  
  // Socket keys
  export const socketKeys = {
    sites: "sites",
    indexUpdate: "index-update",
  };
  
  export const socketMessages = {
    authError: "Not authorized",
  };
  export const searchLimits = {
    designerPlanLimit: 100,
    agencyPlanLimit: 300,
    diyPlanLimit: 10,
  };
  
  export const searchLimitRestrictions = {
    exceedLimit:
      "You have surpassed your monthly limits for search keywords. To continue searching, please upgrade your plan",
    getSearchCredit: "Successfully get the search credit",
  };
  
  export const auditIssues = {
    thinContentIssue: "Thin content pages",
    pageWithoutKeywordAdded: "Pages without keyword added",
    blogPost: "Suggested blog posts",
    metaDescriptionTooLong: "Pages with SEO descriptions too long",
    metaDescriptionTooShort: "Pages with SEO descriptions too short",
    titleTooLong: "Pages with SEO titles too long",
    titleTooShort: "Pages with SEO titles too short",
    altImages: "Pages with images missing alt tag",
    overSizedImages: "Pages with oversized images",
    brokenLinks: "Pages with broken links",
    titleIssueTextOne: "This page's SEO title is ",
    titleIssueTextTwo: " characters; it should be between 50 and 60 characters.",
    descriptionTextOne: "The SEO description on this page is ",
    descriptionTextTwo:
      " characters; it should be between 150 and 160 characters.",
    thinContentIssueText:
      "This page has thin content - ensure it has > 300 words on the page.",
    pageWithoutIssueText: "You haven’t scanned this page with a keyword yet.",
    overSizeImageText: " image(s) on this page are oversized, i.e. >250kb.",
    brokenLinkTextOne: "There are ",
    brokenLinkTextTwo: " broken links on this web page that need to be fixed.",
    matchesForShortLong: [
      "Pages with SEO titles too long",
      "Pages with SEO titles too short",
      "Pages with SEO descriptions too short",
      "Pages with SEO descriptions too long",
    ],
    commonSeoTitle: [
      "Pages with target keyword not in SEO Title",
      "Pages missing an SEO title",
      "Pages with SEO titles too long",
      "Pages with SEO titles too short",
    ],
    commonSeoDescription: [
      "Pages without an SEO Description",
      "Pages with SEO descriptions too long",
      "Pages with SEO descriptions too short",
      "Pages with target keyword missing in SEO description ",
    ],
  };
  
  export const keywordResearchModules = {
    keywordOverview: "keyword overview",
    competitorAnalysis: "competitor analysis",
    blogPost: "blog post",
  };
  
  export const seoTaskPriority = {
    critical: [
      "Pages with broken links",
      "Pages with thin content",
      "Number of pages not showing up on Google",
      "Pages with target keyword not in SEO Title",
      "Pages with target keyword missing in H1 (H1 tag)",
      "Pages with target keyword missing in SEO description ",
      "Pages without an SSL Certificate",
      "Pages missing a H1 (H1 tag)",
    ],
    recommended: [
      "Pages with oversized images",
      "Products missing a product description",
      "Pages missing an SEO title",
      "Pages without an SEO Description",
      "Pages with images missing alt tag",
      "Pages with SEO titles too long",
      "Pages with SEO titles too short",
      "Pages with SEO descriptions too short",
      "Pages with SEO descriptions too long",
      "Pages with external link not opening in new tab",
      "Words count in meta description",
      "Pages with target keyword missing in URL",
      "Pages with suboptimal URL length",
    ],
    optional: [
      "Pages with multiple H1s",
      "Pages at risk of keyword cannabilization",
      "Pages without keyword added",
      "Pages with target keyword missing in alt tag",
      "Pages with suboptimal H1 length",
      "Pages with suboptimal H1 length",
    ],
  };
  
  // This the activity log endpoint
  export const endPoints = ["/api/v2/user/details"];
  export const stripeStatusTrial = "trialing";
  export const appPageRedirect = "/external-scans";
  export const allowSlotPlans = ["designer", "agency", "pro"];
  export const reportFilter = { first_audit: "first_audit", last_30: "last_30" };
  0;
  // application status
  export const applicationENV = "production";
  export const applicationLogENV = ["development", "staging", "production"];
  export const applicationAllowHTTPS = ["staging", "production"];
  