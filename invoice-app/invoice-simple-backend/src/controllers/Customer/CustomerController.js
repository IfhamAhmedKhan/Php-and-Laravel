// includes
const mongoose = require("mongoose");
const moment = require("moment");
const ObjectId = mongoose.Types.ObjectId;
const sanitize = require("mongo-sanitize");
const translate = require("../../helpers/translate");

// Models
const CustomerModel = require("../../models/Customers");
const ProductsModel = require("../../models/Products");
const DownloadFileLogsModel = require("../../models/DownloadFileLogs");

// helper functions
const systemLogsHelper = require("../../helpers/system-logs");
const {
  sendResponse,
  checkKeysExist,
  setUserResponse,
  authenticate,
  getPolicyDetails,
  getPmdDocs,
  getPmdDocumentDownload,
  getModuleNameFromLanguage,
  getResponseMsgsFromLanguage,
} = require("../../helpers/utils");

const puppeteer = require("puppeteer");
const FormData = require("form-data");
const axios = require("axios");
const { Readable } = require("stream"); // Import stream module

// module name
// const moduleName = "Customer";
let moduleName;
let responseMsgs;

var lang = "english";
var channel = "web";
const coreAPIUrl = process.env.CORE_API_URL;

// const sendEmail = require("../../helpers/send-email-test");
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  updatePhoneNumber,
  updateAccountStatus,
  getPolicy,
  // getPolicyTest,
  getPmdDocsForUS,
  getPmdDocumentDownloadForUS,
  dashboard,
  getById,
  getMemberShipPdf,
  filterPolicies,
  // createMembershipDownloadFileLogs,
};

/**
 * @route   POST /api/auth/create-profile
 * @desc    Create or update user profile
 * @access  Private (Assumes user is authenticated)
 *
 * @request
// Builder Create Profile Payload
{
    "roleName": "Builder",
    "companyName": "ABC Builders Pvt Ltd",
    "phoneNumber": "0400000000",
    "street": "123 Builder Street, Melbourne",
    "postCode": "3000",
    "suburb": "Southbank",
    "state": "VIC",
    "insurancePolicyNumber": "INS-12345678",
    "abn": "12345678901",
    "insurancePolicyFileUrl": "https://cdn.example.com/docs/builder_insurance.pdf",
    "websiteLink": "https://abcbuilders.com.au",
    "facebookLink": "https://facebook.com/abcbuilders",
    "instagramLink": "https://instagram.com/abcbuilders",
    "linkedinLink": "https://linkedin.com/company/abcbuilders",
    "tiktokLink": "https://tiktok.com/@abcbuilders",
    "avatar": {
        "fileName": "https://cdn.example.com/avatars/builder123.jpg"
    }
}


// Tradie Create Profile Payload
{
    "roleName": "Tradie",
    "companyName": "TradiePro Services",
    "street": "45 Trades Lane, Sydney",
    "postCode": "2000",
    "suburb": "Parramatta",
    "state": "NSW",
    "insurancePolicyNumber": "TRADE-98765432",
    "abn": "98765432100",
    "insurancePolicyFileUrl": "https://cdn.example.com/docs/tradie_insurance.pdf",
    "intro": "Expert tradies for residential and commercial jobs.",
    "phoneNumber": "0411000000",
    "tardeId": "688a0a5899876e3055471702",
    "experienceLevel": "3+ years",
    "websiteLink": "https://tradiepro.com.au",
    "facebookLink": "https://facebook.com/tradiepro",
    "instagramLink": "https://instagram.com/tradiepro",
    "linkedinLink": "https://linkedin.com/company/tradiepro",
    "tiktokLink": "https://tiktok.com/@tradiepro",
    "avatar": {
        "fileName": "https://cdn.example.com/avatars/tradie123.jpg"
    },
    "certificationFiles": [
        "https://cdn.example.com/certificates/tradie_cert1.pdf",
        "https://cdn.example.com/certificates/tradie_cert2.pdf"
    ]
}
 */

async function createProfile(request, response) {
  try {
    channel = request.header("channel") ? request.header("channel") : lang;
    const userId = request.user?._id;
    const body = request.body;
    const roleName = body.roleName;

    // Required fields
    const requiredFields = [
      "companyName",
      "street",
      "postCode",
      "state",
      "suburb",
      "state",
      "insurancePolicyNumber",
      "abn",
    ];
    const missingKeys = await checkKeysExist(body, requiredFields);
    if (missingKeys) {
      return sendResponse(response, "createProfile", 422, 0, missingKeys);
    }

    const oldProfile = await CustomerModel.findById(userId).lean();
    if (!oldProfile) {
      return sendResponse(response, "createProfile", 404, 0, "User not found");
    }

    const updatedProfile = {
      companyName: sanitize(body.companyName),
      street: sanitize(body.street),
      postCode: sanitize(body.postCode),
      suburb: sanitize(body.suburb),
      state: sanitize(body.state),
      insurancePolicyNumber: sanitize(body.insurancePolicyNumber),
      abn: sanitize(body.abn),
    };
3
    // Optional fields
    const optionalFields = [
      "insurancePolicyFileUrl",
      "intro",
      "phoneNumber",
      "tardeId",
      "websiteLink",
      "facebookLink",
      "instagramLink",
      "linkedinLink",
      "tiktokLink",
    ];

    optionalFields.forEach((field) => {
      const value = body[field];

      if (value !== undefined) {
        if (value === "" || value === null) {
          updatedProfile[field] = null; // Clear from DB
        } else {
          updatedProfile[field] = sanitize(value);
        }
      }
    });

    // Optional arrays
    const arrayFields = ["certificationFiles"];
    arrayFields.forEach((field) => {
      const value = body[field];
      if (Array.isArray(value)) {
        updatedProfile[field] = value.map(sanitize);
      } else if (value === "" || value === null) {
        updatedProfile[field] = []; // clear empty array
      }
    });

    // Avatar
    if (body.avatar?.fileName) {
      updatedProfile.avatar = sanitize(body.avatar.fileName);
    }

    // Experience level
    const validLevels = ["1+ years", "3+ years", "8+ years"];
    if (body.experienceLevel !== undefined) {
      if (validLevels.includes(body.experienceLevel)) {
        updatedProfile.experienceLevel = sanitize(body.experienceLevel);
      } else {
        updatedProfile.experienceLevel = null; // invalid/cleared
      }
    }

    // Role-based profile percentage
    const percentageMapBuilder = [
      { field: "companyName", points: 10 },
      { field: "street", points: 10 },
      { field: "phoneNumber", points: 20 },
      { field: "insurancePolicyNumber", points: 20 },
      { field: "postCode", points: 10 },
      { field: "suburb", points: 10 },
      { field: "state", points: 10 },
      { field: "abn", points: 5 },
      { field: "websiteLink", points: 1 },
      { field: "facebookLink", points: 1 },
      { field: "instagramLink", points: 1 },
      { field: "linkedinLink", points: 1 },
      { field: "tiktokLink", points: 1 },
    ];

    const percentageMapTradie = [
      { field: "companyName", points: 10 },
      { field: "street", points: 10 },
      { field: "phoneNumber", points: 10 },
      { field: "tardeId", points: 20 },
      { field: "insurancePolicyNumber", points: 15 },
      // { field: "certifications", type: "array", points: 10 },
      {
        field: "experienceLevel",
        type: "enum",
        valid: validLevels,
        points: 10,
      },
      { field: "postCode", points: 5 },
      { field: "suburb", points: 5 },
      { field: "state", points: 5 },
      { field: "abn", points: 5 },
      { field: "websiteLink", points: 1 },
      { field: "facebookLink", points: 1 },
      { field: "instagramLink", points: 1 },
      { field: "linkedinLink", points: 1 },
      { field: "tiktokLink", points: 1 },
    ];

    const percentageMap =
      roleName === "Builder" ? percentageMapBuilder : percentageMapTradie;

    let profilePercentage = 0;

    for (const item of percentageMap) {
      const value = body[item.field];
      // console.log("item", item, value)
      if (item.type === "array") {
        if (Array.isArray(value) && value.length > 0) {
          profilePercentage += item.points;
        }
      } else if (item.type === "enum") {
        if (item.valid.includes(value)) {
          profilePercentage += item.points;
        }
      } else {
        if (value && value !== "") {
          profilePercentage += item.points;
        }
      }
    }

    updatedProfile.profilePercentage = profilePercentage;

    // Save to DB
    const result = await CustomerModel.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true }
    );

    return sendResponse(
      response,
      "createProfile",
      200,
      1,
      "Profile updated successfully",
      result
    );
  } catch (error) {
    console.error("--- createProfile error ---", error);
    return sendResponse(
      response,
      "createProfile",
      500,
      0,
      "Something went wrong"
    );
  }
}

async function getProfile(request, response) {
  try {
    const userId = request.user?._id;

    // if (!userId) {
    //   return sendResponse(response, "getProfile", 401, 0, "Unauthorized");
    // }

    const user = await CustomerModel.findById(userId).lean();

    if (!user) {
      return sendResponse(response, "getProfile", 422, 0, "User not found");
    }

    return sendResponse(
      response,
      "getProfile",
      200,
      1,
      "User Profile fetched successfully",
      user
    );
  } catch (error) {
    console.error("--- getProfile error ---", error);
    return sendResponse(response, "getProfile", 500, 0, "Something went wrong");
  }
}

/** get record **/
async function getById(request, response) {
  lang = request.header("lang") ? request.header("lang") : lang;
  moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
  responseMsgs = await getResponseMsgsFromLanguage(lang, "CustomerController");

  let params = request.body;

  try {
    // check if record exists
    if (params.cnic) {
      let check = await CustomerModel.findOne({ cnic: params.cnic });
      if (check) {
        let rsp = await setUserResponse(check, false);
        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.recordFetched,
          // "Record fetched",
          rsp
        );
      }
    } else {
      let rsp = await setUserResponse(request.user, false);
      return sendResponse(
        response,
        moduleName,
        200,
        1,
        responseMsgs.recordFetched,
        rsp
      );
    }

    return sendResponse(
      response,
      moduleName,
      422,
      0,
      responseMsgs.recordNotFound
    );
  } catch (error) {
    console.log("--- GET API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

/** update record **/
async function updateProfile(request, response) {
  lang = request.header("lang") ? request.header("lang") : lang;
  moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
  responseMsgs = await getResponseMsgsFromLanguage(lang, "CustomerController");

  let params = request.body;
  let currentCnic = request.user.cnic;
  console.log("Current CNIC ", currentCnic);
  // check if the required keys are missing or not
  // let checkKeys = await checkKeysExist(params,['cnic'])
  // console.log("==== Request User====", request.user.cnic);
  //   if (checkKeys) {
  //     return sendResponse(response, moduleName, 422, 0, checkKeys);
  //   }
  try {
    // check if record is already exists4
    // if (params.email) {
    //   let check = await CustomerModel.countDocuments({
    //     $and: [
    //       {
    //         email: params.email,
    //       },
    //       {
    //         // cnic: { $ne: params.cnic },
    //         cnic: { $ne: currentCnic },
    //       },
    //     ],
    //   });
    //   if (check && check > 0) {
    //     return sendResponse(
    //       response,
    //       moduleName,
    //       422,
    //       0,
    //       responseMsgs.emailExists
    //       // "Record already exists with the given email"
    //     );
    //   }
    // }

    // var record = await CustomerModel.findOne({ cnic: params.cnic });
    var record = await CustomerModel.findOne({ cnic: currentCnic });
    if (record) {
      params.updatedAt = new Date();
      let updated = await CustomerModel.findOneAndUpdate(
        {
          //   cnic: params.cnic,
          cnic: currentCnic,
        },
        params,
        {
          new: true,
        }
      );
      // record.email = params.email
      // record.fullName = params.fullName
      // record.image = params.image
      // record.updatedAt = new Date()
      //
      //
      // // update a record
      // let data = await record.save()
      // if updated successfully

      if (updated) {
        //create system logs
        let systemLogsData = {
          userId: request.user._id,
          userIp: request.ip,
          roleId: request.user.roleId,
          module: moduleName,
          action: "updated",
          data: updated,
        };
        let systemLogs = await systemLogsHelper.composeSystemLogs(
          systemLogsData
        );
        let rsp = await setUserResponse(updated, false);
        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.profileUpdated,
          // "Profile has been updated successfully",
          rsp
        );
      }
    }
    return sendResponse(
      response,
      moduleName,
      422,
      0,
      responseMsgs.customerNotFound
    );
  } catch (error) {
    console.log("--- Update Profile API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

/** update Phone Number **/
async function updatePhoneNumber(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );
    const { cnic } = request.user;
    const { phoneNumber } = request.body;
    console.log("CNIC", cnic);
    console.log("Phone Number", phoneNumber);

    // Check if required keys are missing
    const missingKeys = await checkKeysExist({ phoneNumber }, ["phoneNumber"]);
    if (missingKeys) {
      return sendResponse(response, moduleName, 422, 0, missingKeys);
    }

    // Find customer record
    const record = await CustomerModel.findOne({ cnic });
    if (!record) {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.customerNotFound
      );
    }

    // Update phone number
    const updated = await CustomerModel.findOneAndUpdate(
      { cnic },
      {
        phoneNumber,
        isPhoneNumberValidated: true,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (updated) {
      // Create system logs and send response
      const systemLogsData = {
        userId: request.user._id,
        userIp: request.ip,
        roleId: request.user.roleId,
        module: moduleName,
        action: "updated",
        data: updated,
      };
      await systemLogsHelper.composeSystemLogs(systemLogsData);

      const rsp = await setUserResponse(updated);
      return sendResponse(
        response,
        moduleName,
        200,
        1,
        responseMsgs.phoneNumberUpdated,
        rsp
      );
    }
  } catch (error) {
    console.error("--- Update Phone Number API Error ---", error);
    return sendResponse(response, moduleName, 500, 0, responseMsgs.error_500);
  }
}

/** updateAccountStatus **/
async function updateAccountStatus(request, response) {
  lang = request.header("lang") ? request.header("lang") : lang;
  moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
  responseMsgs = await getResponseMsgsFromLanguage(lang, "CustomerController");

  let params = request.body;

  // check if the required keys are missing or not
  let checkKeys = await checkKeysExist(params, ["cnic", "status"]);
  if (checkKeys) {
    return sendResponse(response, moduleName, 422, 0, checkKeys);
  }
  try {
    var record = await CustomerModel.findOne({ cnic: params.cnic });
    if (record) {
      record.status = params.status;
      record.updatedAt = new Date();

      if (record.status === "delete") {
        const data = await CustomerModel.deleteOne({ cnic: params.cnic });
        if (data) {
          let systemLogsData = {
            // userId: request.user._id,
            userIp: request.ip,
            // roleId: request.user.roleId,
            module: moduleName,
            action: "deleteUser",
            data: data,
          };
          let systemLogs = await systemLogsHelper.composeSystemLogs(
            systemLogsData
          );

          return sendResponse(
            response,
            moduleName,
            200,
            1,
            responseMsgs.accountDeleted
            // "Account has been updated successfully"
          );
        }
      }

      // update a record
      let data = await record.save();
      // if updated successfully

      if (data) {
        //create system logs
        let systemLogsData = {
          // userId: request.user._id,
          userIp: request.ip,
          // roleId: request.user.roleId,
          module: moduleName,
          action: "updatedStatus",
          data: data,
        };
        let systemLogs = await systemLogsHelper.composeSystemLogs(
          systemLogsData
        );

        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.accountUpdated
          // "Account has been updated successfully"
        );
      }
    }
    return sendResponse(
      response,
      moduleName,
      422,
      0,
      responseMsgs.recordNotFound
    );
  } catch (error) {
    console.log("--- Update Profile Status API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

/** Get PMD Docs From API */
async function getPmdDocsForUS(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );
    let policyNo = request.body.policyNo;

    let auth = await authenticate();
    console.log("this is the auth response----", auth);

    if (auth) {
      let pmdDocsResponse = await getPmdDocs(policyNo, auth);

      console.log("pmdDocsResponse=====", pmdDocsResponse);
      // Check if pmdDocsResponse before proceeding
      if (pmdDocsResponse?.data === null) {
        return sendResponse(
          response,
          moduleName,
          // 422,
          200,
          // 0,
          1,
          responseMsgs.recordNotFound
        );
      }
      if (pmdDocsResponse) {
        // Group the files by AttachmentType using reduce
        const groupedFiles = pmdDocsResponse.reduce((acc, doc) => {
          const {
            AttachmentType,
            FileExtension,
            // FileBytes,
            Description,
            SerialNo,
          } = doc;

          // Use a map object for better performance in accessing categories
          if (!acc[AttachmentType]) {
            acc[AttachmentType] = {
              categoryTitle: AttachmentType,
              filesArray: [],
            };
          }

          // Push the file information directly to the corresponding category
          acc[AttachmentType].filesArray.push({
            policyNo: policyNo,
            extension: FileExtension,
            serialNo: SerialNo,
            // fileBytes: FileBytes,
            description:
              Description && Description !== "" ? Description : AttachmentType,
          });

          return acc;
        }, {});

        // Convert the grouped object back into an array
        let resp = {
          downloadFiles: Object.values(groupedFiles),
        };

        let systemLogsData = {
          userId: request.user._id,
          userIp: request.ip,
          roleId: request.user.roleId,
          module: moduleName,
          action: "PMD Docs",
          data: resp,
        };
        let systemLogs = await systemLogsHelper.composeSystemLogs(
          systemLogsData
        );

        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.recordFetched,
          resp
        );
      }
    }
    return sendResponse(
      response,
      moduleName,
      200,
      1,
      // 422,
      // 0,
      responseMsgs.authFailed
    );
  } catch (error) {
    console.log("--- Get PMD Docs API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      200,
      1,
      // 500,
      // 0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

/** Get PMD Document download From API */
async function getPmdDocumentDownloadForUS(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );
    const policyNo = request.body.policyNo;
    const serialNo = request.body.serialNo;
    const fileTitle = request.body.fileTitle;
    let ApiPayload = { PMDNo: policyNo, SerialNo: serialNo };

    let auth = await authenticate();
    console.log("this is the auth response----", auth);

    if (auth) {
      let pmdDocDownloadresponse = await getPmdDocumentDownload(
        ApiPayload,
        auth
      );

      console.log("pmdDocDownloadresponse=====", pmdDocDownloadresponse);
      // pmdDocDownloadresponse[0]?.FileBytes = null ;

      // yahan kaam karna hai download file logs create karny hain
      const downloadFileLogPayload = {
        membershipNumber: policyNo,
        serialNumber: serialNo,
        fileTitle: fileTitle,
        logStatus: pmdDocDownloadresponse[0]?.FileBytes
          ? "Successfully Downloded"
          : "Error File Bytes are Null",
        createdBy: request.user._id,
      };
      // params.createdBy = request.user._id; // Assuming the user is authenticated
      console.log("Download File Log Payload ==> ", downloadFileLogPayload);
      let downloadFileLog = new DownloadFileLogsModel(downloadFileLogPayload);

      let savedRecord = await downloadFileLog.save();

      if (savedRecord) {
        console.log("Created Data of Download File log", savedRecord);
      } else {
        console.log("Data Not Created for Download File log", savedRecord);
      }

      // Check if pmdDocDownloadresponse before proceeding
      if (!pmdDocDownloadresponse[0]?.FileBytes) {
        return sendResponse(
          response,
          moduleName,
          422,
          0,
          responseMsgs.recordNotFound
        );
      }

      if (pmdDocDownloadresponse) {
        const fileBytes = pmdDocDownloadresponse[0]?.FileBytes;

        let resp = {
          fileBytes: fileBytes,
        };

        let systemLogsData = {
          userId: request.user._id,
          userIp: request.ip,
          roleId: request.user.roleId,
          module: moduleName,
          action: "PMD Document Download",
          data: resp,
        };
        let systemLogs = await systemLogsHelper.composeSystemLogs(
          systemLogsData
        );
        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.recordFetched,
          resp
        );
      }
    }
    return sendResponse(
      response,
      moduleName,
      200,
      1,
      // 422,
      // 0,
      responseMsgs.authFailed
    );
  } catch (error) {
    console.log("--- Get PMD Documnet Download API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      200,
      1,
      // 500,
      // 0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

/** Get Dashboard **/
async function dashboard(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );
    let channel = request.header("channel") ? request.header("channel") : "web";
    // let webBannerImages = [
    //   "customers/file-1737723213655.png",
    //   "customers/file-1737723261370.png",
    //   "customers/file-1737723288751.png",
    // ];

    let webBannerImages = [];
    if (process.env.ENVIRONMENT.toUpperCase() == "DEV") {
      webBannerImages = [
        "customers/file-1737723213655.png",
        "customers/file-1737723261370.png",
        "customers/file-1737723288751.png",
      ];
    }
    if (process.env.ENVIRONMENT.toUpperCase() == "UAT") {
      webBannerImages = [
        "customers/file-1738152231846.png",
        "customers/file-1738152250880.png",
        "customers/file-1738152268206.png",
      ];
    }
    if (process.env.ENVIRONMENT.toUpperCase() == "PRODUCTION") {
      webBannerImages = [
        "customers/file-1738152292287.png",
        "customers/file-1738152306294.png",
        "customers/file-1738152321932.png",
      ];
    }

    let appBannerImages = [];
    if (process.env.ENVIRONMENT.toUpperCase() == "DEV") {
      appBannerImages = [
        "customers/file-1725734358510.jpg",
        "customers/file-1725734411232.jpg",
        "customers/file-1725734443156.jpg",
      ];
    }
    if (process.env.ENVIRONMENT.toUpperCase() == "UAT") {
      appBannerImages = [
        "customers/file-1725734524605.jpg",
        "customers/file-1725734555644.jpg",
        "customers/file-1725734590710.jpg",
      ];
    }
    if (process.env.ENVIRONMENT.toUpperCase() == "PRODUCTION") {
      appBannerImages = [
        "customers/file-1726771493973.png",
        "customers/file-1726771518851.jpg",
        "customers/file-1726771546933.jpg",
        "customers/file-1726771568309.jpg",
      ];
    }

    let getProd = await ProductsModel.findOne({ displayOnDashboard: true });
    let respData = {
      bannerImages: channel == "web" ? webBannerImages : appBannerImages,
      fundImage: "customers/file-1717077745294.png",
      mabrurImage: "customers/file-1717077812587.png",
      hajjAndUmrahImage: "customers/file-1717077714447.png",
      membershipImage: "customers/file-1717077791964.png",
      productId: getProd ? getProd._id : null,
    };

    //create system logs
    let systemLogsData = {
      userId: request.user._id,
      userIp: request.ip,
      roleId: request.user.roleId,
      module: moduleName,
      action: "dashboard",
      data: respData,
    };
    let systemLogs = await systemLogsHelper.composeSystemLogs(systemLogsData);

    return sendResponse(
      response,
      moduleName,
      200,
      1,
      responseMsgs.recordFetched,
      respData
    );
    // return sendResponse(response,moduleName,422,0,"Customer not found")
  } catch (error) {
    console.log("--- Update Profile Status API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

// /** Create Record in Membership Download File Logs  model **/
// async function createMembershipDownloadFileLogs(request, response) {
//   lang = request.header("lang") ? request.header("lang") : lang;
//   moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
//   responseMsgs = await getResponseMsgsFromLanguage(lang, "CustomerController");

//   let params = request.body;
//   let channel = request.header("channel") ? request.header("channel") : "web";

//   try {
//     // Sanitize the input to prevent NoSQL injection
//     params = sanitize(params);
//     // Create new Membership Download file Log record
//     params.createdBy = request.user._id; // Assuming the user is authenticated
//     console.log("Payload ==> ", params);
//     let downloadFileLog = new DownloadFileLogsModel(params);

//     let savedRecord = await downloadFileLog.save();

//     if (savedRecord) {
//       // Create system logs
//       let systemLogsData = {
//         userId: request.user._id,
//         userIp: request.ip,
//         roleId: request.user.roleId,
//         module: moduleName,
//         action: "created",
//         data: savedRecord,
//       };
//       await systemLogsHelper.composeSystemLogs(systemLogsData);
//       console.log("Created Data", savedRecord);
//       return sendResponse(
//         response,
//         moduleName,
//         200,
//         1,
//         responseMsgs.recordCreated,
//         savedRecord
//       );
//     }

//     return sendResponse(
//       response,
//       moduleName,
//       422,
//       0,
//       responseMsgs.recordNotCreated
//     );
//   } catch (error) {
//     console.log(
//       "--- Create MemberShip Download Files Logs API Error ---",
//       error
//     );
//     return sendResponse(response, moduleName, 500, 0, responseMsgs.error_500);
//   }
// }

function filterPolicies(data) {
  // if (data.Policies && Array.isArray(data.Policies)) {
  //     return data.Policies.filter(policy =>
  //         policy.Status === "In-Force (In-Force)" || policy.Status === "In-Force (Reinstated)"
  //     );
  // }
  // if (data.Policies && Array.isArray(data.Policies)) {
  //   return data.Policies.filter((policy) =>
  //     ["cancel", "surrender", "mature", "claim"].every(
  //       (exclude) => !policy.Status.toLowerCase().includes(exclude)
  //     )
  //   );
  // }

  // if (data.Policies && Array.isArray(data.Policies)) {
  //   return data.Policies.filter((policy) =>
  //     [
  //       "ANF",
  //       "In-force",
  //       "In-force (ANF)",
  //       "In-Force (In-Force)",
  //       "In-Force (Reinstated)",
  //       "Lapse",
  //       "Lapse (Forfeited)",
  //       "Lapse (non payment)",
  //       "Lapse Charged",
  //       "Paid-up (Auto)",
  //       "Paid-up (Requested)",
  //     ].some((include) => policy.Status.includes(include))
  //   );
  // }

  if (data.Policies && Array.isArray(data.Policies)) {
    return data.Policies.filter((policy) =>
      ["ANF", "Active In-Force", "Active", "Lapse", "Paid-Up"].some((include) =>
        policy.Status.includes(include)
      )
    );
  }

  return [];
}

function filterRiders(data) {
  if (data && Array.isArray(data)) {
    return data.filter((policy) => policy.Name != "Main Plan");
  }
  return data;
}

// /** Get Policy **/
// async function getPolicy(request, response) {
//   try {
//     lang = request.header("lang") ? request.header("lang") : lang;
//     moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
//     responseMsgs = await getResponseMsgsFromLanguage(
//       lang,
//       "CustomerController"
//     );

//     let auth = await authenticate();
//     console.log("this is the auth response----", auth);

//     if (auth) {
//       let policy = await getPolicyDetails(request.user.cnic, auth);

//       if (policy) {
//         let filteredPolicies = filterPolicies(policy);

//         for (let i = 0; i < filteredPolicies.length; i++) {
//           console.log("policies length", filteredPolicies.length);
//           console.log("Element Number", i);

//           const currentPolicy = filteredPolicies[i];
//           const CashValue = currentPolicy.CashValue || 0;
//           const FundStats = currentPolicy.FundStats || [];

//           if (FundStats.length > 0) {
//             const lastIllustration =
//               FundStats[FundStats.length - 1].Illustration9 || 0;
//             const graphPercentage = lastIllustration
//               ? Math.round((CashValue / lastIllustration) * 100)
//               : 0;

//             console.log("Cash Value", CashValue);
//             console.log("lastIllustration", lastIllustration);
//             console.log("currentPolicy Status", currentPolicy.Status);

//             if (["ANF", "Lapse"].includes(currentPolicy.Status)) {
//               console.log("ANF & Lapse Case True");

//               currentPolicy.gaugeChart = {
//                 cashValue: CashValue,
//                 Illustration: lastIllustration,
//                 percentage: graphPercentage,
//                 label: responseMsgs.AFNandLapseCase,
//               };
//             } else {
//               console.log("Status Not Matched");
//               // if (graphPercentage >= 0 && graphPercentage < 10) {
//               if (graphPercentage <= 10) {
//                 console.log("From Below 10 Percentage", graphPercentage);
//                 currentPolicy.gaugeChart = {
//                   cashValue: CashValue,
//                   Illustration: lastIllustration,
//                   percentage: graphPercentage,
//                   label: responseMsgs.FromBelow10Percentage,
//                 };
//               } else if (graphPercentage >= 11 && graphPercentage <= 50) {
//                 console.log("From 11 to 50 Percentage", graphPercentage);
//                 currentPolicy.gaugeChart = {
//                   cashValue: CashValue,
//                   Illustration: lastIllustration,
//                   percentage: graphPercentage,
//                   label: responseMsgs.From11to50Percentage,
//                 };
//               } else if (graphPercentage >= 51 && graphPercentage <= 80) {
//                 console.log("From 51 to 80 Percentage", graphPercentage);
//                 currentPolicy.gaugeChart = {
//                   cashValue: CashValue,
//                   Illustration: lastIllustration,
//                   percentage: graphPercentage,
//                   label: responseMsgs.From51to80Percentage,
//                 };
//               } else if (graphPercentage >= 81 && graphPercentage <= 100) {
//                 console.log("From 81 to 100 Percentage", graphPercentage);
//                 currentPolicy.gaugeChart = {
//                   cashValue: CashValue,
//                   Illustration: lastIllustration,
//                   percentage: graphPercentage,
//                   label: responseMsgs.From81to100Percentage,
//                 };
//               } else {
//                 // Optional: Assign a default gaugeChart if no condition is met
//                 console.log("Graph percentage out of range", graphPercentage);
//                 currentPolicy.gaugeChart = {
//                   cashValue: CashValue,
//                   Illustration: lastIllustration,
//                   percentage: 0,
//                   label: "No data available",
//                 };
//               }
//             }
//           }
//         }
//         let resp = {
//           InsuredInfo: policy.InsuredInfo,
//           Policies: filteredPolicies,
//         };
//         let systemLogsData = {
//           userId: request.user._id,
//           userIp: request.ip,
//           roleId: request.user.roleId,
//           module: moduleName,
//           action: "policy",
//           data: resp,
//         };
//         let systemLogs = await systemLogsHelper.composeSystemLogs(
//           systemLogsData
//         );

//         return sendResponse(
//           response,
//           moduleName,
//           200,
//           1,
//           responseMsgs.recordFetched,
//           resp
//         );
//         // }
//         return sendResponse(
//           response,
//           moduleName,
//           422,
//           0,
//           responseMsgs.customerNotFound
//         );
//       }
//       return sendResponse(
//         response,
//         moduleName,
//         422,
//         0,
//         responseMsgs.authFailed
//       );
//     }
//   } catch (error) {
//     console.log("--- Get Policy API Error ---", error);

//     return sendResponse(
//       response,
//       moduleName,
//       500,
//       0,
//       responseMsgs.error_500
//       // "Something went wrong, please try again later."
//     );
//   }
// }

// get memberShipPdf
// async function getMemberShipPdf(request, response) {
//   try {
//     // console.log("Request", request.user);
//     // console.log("Requested User's Cnic", request.user.cnic);

//     let auth = await authenticate();
//     // let auth = true;
//     console.log("this is the auth response----", auth);

//     if (auth) {
//       let policy = await getPolicyDetails(request.user.cnic, auth);
//       // let policy = true;

//       if (policy) {
//         let filteredPolicies = filterPolicies(policy);
//         for (let i = 0; i < filteredPolicies.length; i++) {
//           let filteredRiders = filterRiders(filteredPolicies[i].Riders);
//           filteredPolicies[i].Riders = filteredRiders;
//         }
//         // console.log('this is the response----',filteredRiders)
//         let resp = {
//           InsuredInfo: policy.InsuredInfo,
//           Policies: filteredPolicies,
//         };

//         // let resp = {
//         //   InsuredInfo: {
//         //     Salutation: "Mr.",
//         //     FullName: "Haris Sheikh ",
//         //     CNIC: "4563186461456",
//         //     Mobile: "03121234567",
//         //     FullAddress:
//         //       "Shop no 6, first floor, dolman center main tariq road",
//         //     DOB: "05/09/1993",
//         //     Email: "haris.sheikh@abc.com",
//         //     Gender: "Male",
//         //     Country: "Pakistan",
//         //     Province: "Punjab",
//         //     City: "Ahmadpur East",
//         //     AttainedAge: 33,
//         //     AgeAtCommencement: 31,
//         //   },
//         //   Policies: [
//         //     {
//         //       OwnerInfo: {
//         //         Salutation: "Mr.",
//         //         FullName: "Haris Sheikh ",
//         //         CNIC: "4563186461456",
//         //         Mobile: "03121234567",
//         //         FullAddress:
//         //           "Shop no 6, first floor, dolman center main tariq road",
//         //         DOB: "05/09/1993",
//         //         Email: "haris.sheikh@abc.com",
//         //         Gender: "Male",
//         //         Country: "Pakistan",
//         //         Province: "Punjab",
//         //         City: "Ahmadpur East",
//         //         AttainedAge: 33,
//         //         AgeAtCommencement: 31,
//         //       },
//         //       PolicyNo: "5PUL2024000004527-1",
//         //       Status: "In-Force (In-Force)",
//         //       Product:
//         //         "ADC - Mina Hajj Plan - 5th Pillar Family Takaful Mina Hajj Plan",
//         //       Plan: "ADC - Mina Hajj Plan - 5th Pillar Family Takaful Mina Hajj Plan",
//         //       UWDecision: "Standard",
//         //       PartnerName: "Ping Up",
//         //       Channel: "Alternate Distribution Channel",
//         //       ChannelModel: "Pingup - Direct",
//         //       CashValue: 82082.7508,
//         //       CashValueDate: "19/09/2024",
//         //       IssueDate: "31/12/2024",
//         //       CommencementDate: "01/01/2024",
//         //       TotalModeContribution: 16214,
//         //       RegularModeContribution: 16200,
//         //       Mode: "MONTHLY",
//         //       FaceValue: 1944000,
//         //       PlanTerm: 10,
//         //       PayTerm: 10,
//         //       CoverMultiple: 10,
//         //       RegularSuspense: 109580,
//         //       TopupSuspense: 0,
//         //       TotalRegularPaidContribution: 584988,
//         //       TotalTopupPaidContribution: 0,
//         //       TotalRemainingContribution: 1367184,
//         //       NextDueDate: "01/01/2027",
//         //       MaturityDate: "01/01/2034",
//         //       NextDueAmount: 16200,
//         //       OverDueAmount: 1367184,
//         //       CurrentPolicyYear: 3,
//         //       Funds: [
//         //         {
//         //           FundName: "5th Pillar Balanced Fund",
//         //           FundCode: "2",
//         //           Profile: null,
//         //           UnitsRegular: 494.999818,
//         //           UnitsAdhoc: 0,
//         //           Distribution: 100,
//         //           CashValueRegular: 82082.7508,
//         //           CashValueAdhoc: 0,
//         //           Price: {
//         //             BidPrice: 165.8238,
//         //             Date: "19/09/2024",
//         //             Offer: 174.5514,
//         //           },
//         //         },
//         //       ],
//         //       Riders: [
//         //         {
//         //           Name: "Family Income Benefit",
//         //           Code: "3",
//         //           Term: 10,
//         //           FaceValue: 120000,
//         //           Cover: 0,
//         //           CoverType: 0,
//         //           Contribution: 168,
//         //           LoadingContribution: 0,
//         //           MaturityDate: "01/01/2034",
//         //         },
//         //       ],
//         //       FundStats: [
//         //         {
//         //           Illustration6: 113526.38,
//         //           Illustration9: 117810.4,
//         //           Illustration12: 121023.41,
//         //           TotalPaid: 194400,
//         //           Year: 1,
//         //           ClosingCV: 120451.1733,
//         //         },
//         //         {
//         //           Illustration6: 250841.96,
//         //           Illustration9: 264937.65,
//         //           Illustration12: 275730.39,
//         //           TotalPaid: 388800,
//         //           Year: 2,
//         //           ClosingCV: 257040.7548,
//         //         },
//         //         {
//         //           Illustration6: 451387.8,
//         //           Illustration9: 483655.22,
//         //           Illustration12: 508828.19,
//         //           TotalPaid: 583200,
//         //           Year: 3,
//         //           ClosingCV: 436913.3279,
//         //         },
//         //         {
//         //           Illustration6: 660071.34,
//         //           Illustration9: 719852.71,
//         //           Illustration12: 767432.72,
//         //           TotalPaid: 777600,
//         //           Year: 4,
//         //           ClosingCV: 463170.5582,
//         //         },
//         //         {
//         //           Illustration6: 877215.9,
//         //           Illustration9: 974927.1,
//         //           Illustration12: 1054340.54,
//         //           TotalPaid: 972000,
//         //           Year: 5,
//         //           ClosingCV: 491081.6388,
//         //         },
//         //         {
//         //           Illustration6: 1103157.07,
//         //           Illustration9: 1250387.02,
//         //           Illustration12: 1372655.27,
//         //           TotalPaid: 1166400,
//         //           Year: 6,
//         //           ClosingCV: 520589.3971,
//         //         },
//         //         {
//         //           Illustration6: 1338243.15,
//         //           Illustration9: 1547861.66,
//         //           Illustration12: 1725821.34,
//         //           TotalPaid: 1360800,
//         //           Year: 7,
//         //           ClosingCV: 551867.542,
//         //         },
//         //         {
//         //           Illustration6: 1582835.57,
//         //           Illustration9: 1869110.41,
//         //           Illustration12: 2117661.44,
//         //           TotalPaid: 1555200,
//         //           Year: 8,
//         //           ClosingCV: 585021.657,
//         //         },
//         //         {
//         //           Illustration6: 1837309.32,
//         //           Illustration9: 2216033.28,
//         //           Illustration12: 2552418.12,
//         //           TotalPaid: 1749600,
//         //           Year: 9,
//         //           ClosingCV: 620265.5381,
//         //         },
//         //         {
//         //           Illustration6: 2102053.43,
//         //           Illustration9: 2590682.12,
//         //           Illustration12: 3034799.95,
//         //           TotalPaid: 1944000,
//         //           Year: 10,
//         //           ClosingCV: 657523.8309,
//         //         },
//         //       ],
//         //       Beneficiary: [
//         //         {
//         //           Name: "FARAH",
//         //           Relation: "Wife",
//         //           Percentage: "100",
//         //           DOB: "06/08/1996",
//         //           Age: 28,
//         //           Mobile: "",
//         //           CNIC: "4634967461694",
//         //           Guardian: null,
//         //         },
//         //       ],
//         //       DocAgents: {
//         //         Name: "Ping Up Agent One",
//         //         Code: "AGT-00093",
//         //         Mobile: null,
//         //         Email: "",
//         //       },
//         //     },
//         //   ],
//         // };

//         // console.log("Data==>", resp);
//         // console.log("InsuredInfo ==>", resp.InsuredInfo);
//         // console.log("Policies ==>", resp.Policies[0]);

//         const objTmp = {
//           LOGOURL: `https://customers.5thpillartakaful.com/logo.svg`,
//           FULLNAME:
//             resp && resp.InsuredInfo.FullName
//               ? resp.InsuredInfo.FullName.toString()
//               : "N/A",
//           FULLNAME2:
//             resp && resp.InsuredInfo.FullName
//               ? resp.InsuredInfo.FullName.toString()
//               : "N/A",
//           FULLADDRESS:
//             resp && resp.InsuredInfo.FullAddress
//               ? resp.InsuredInfo.FullAddress.toString()
//               : "N/A",
//           CITY:
//             resp && resp.InsuredInfo.City
//               ? resp.InsuredInfo.City.toString()
//               : "N/A",
//           MOBILE:
//             resp && resp.InsuredInfo.Mobile
//               ? resp.InsuredInfo.Mobile.toString()
//               : "N/A",
//           PHONE:
//             resp && resp.InsuredInfo.Phone
//               ? resp.InsuredInfo.Phone.toString()
//               : "N/A",
//           POLICYNO:
//             resp && resp.Policies[0].PolicyNo
//               ? resp.Policies[0].PolicyNo
//               : "N/A",
//           PLAN:
//             resp && resp.Policies[0].Plan
//               ? resp.Policies[0].Plan.toString()
//               : "N/A",
//           COMMNCEMENTDATE:
//             resp && resp.Policies[0].CommencementDate
//               ? resp.Policies[0].CommencementDate.toString()
//               : "N/A",
//           TOTALMODECONTRIBUTION:
//             resp && resp.Policies[0].TotalModeContribution
//               ? resp.Policies[0].TotalModeContribution.toString()
//               : "N/A",
//           MODE:
//             resp && resp.Policies[0].Mode
//               ? resp.Policies[0].Mode.toString()
//               : "N/A",
//           NEXTDUEDATE:
//             resp && resp.Policies[0].NextDueDate
//               ? resp.Policies[0].NextDueDate.toString()
//               : "N/A",
//           TOTALREGULARPAIDCONTRIBUTION:
//             resp && resp.Policies[0].TotalRegularPaidContribution
//               ? resp.Policies[0].TotalRegularPaidContribution.toString()
//               : "N/A",
//           STATUS:
//             resp && resp.Policies[0].Status
//               ? resp.Policies[0].Status.toString()
//               : "N/A",
//           FACEVALUE:
//             resp && resp.Policies[0].FaceValue
//               ? resp.Policies[0].FaceValue.toString()
//               : "N/A",
//           CASHVALUE:
//             resp && resp.Policies[0].CashValue
//               ? resp.Policies[0].CashValue.toString()
//               : "N/A",
//           CASHVALUEDATE:
//             resp && resp.Policies[0].CashValueDate
//               ? resp.Policies[0].CashValueDate.toString()
//               : "N/A",
//         };

//         // console.log("Final Data", objTmp);

//         let replaceData = Object.assign(objTmp);
//         console.log("==== Replace Data ====", replaceData);
//         // let html = translate("pdfTemplates", "memberShipPdf.body", replaceData);
//         // console.log("HTML", html);
//         // return sendResponse(response, moduleName, 200, 1, "data fetched", html);

//         generatePdfAndUpload(replaceData)
//           .then((UploadedResponse) => {
//             console.log("Upload successful, server response:", response);
//             return sendResponse(
//               response,
//               moduleName,
//               200,
//               1,
//               "data fetched",
//               UploadedResponse
//             );
//           })
//           .catch((error) => {
//             console.error("Failed to upload PDF:", error);
//           });

//         // const sendTo = process.env.TOEMAIL;
//         // const ccTo = null;
//         // console.log("send to", sendTo);
//         // const user = {
//         //   email: sendTo,
//         //   emailCC: ccTo,
//         // };
//         // sendEmail(user, objTmp, "memberShipPdf.subject", "memberShipPdf.body");
//         // return sendResponse(response, moduleName, 200, 1, "data fetched", resp);
//       }
//       return sendResponse(response, moduleName, 422, 0, "Customer not found");
//     }
//     return sendResponse(response, moduleName, 422, 0, "Authentication failed");
//   } catch (error) {
//     console.log("--- Get Policy API Error ---", error);

//     return sendResponse(
//       response,
//       moduleName,
//       500,
//       0,
//       "Something went wrong, please try again later."
//     );
//   }
// }

// async function generatePdfAndUpload(replaceData) {
//   try {
//     // Replace data in the HTML template
//     let html = translate("pdfTemplates", "memberShipPdf.body", replaceData);

//     // Step 1: Generate PDF from HTML using html-pdf
//     const options = {
//       width: "14in", // Customize the width as needed
//       height: "14.5in", // Adjust height as needed
//     };

//     const pdfBuffer = await new Promise((resolve, reject) => {
//       pdf.create(html, options).toBuffer((err, buffer) => {
//         if (err) return reject(err);
//         resolve(buffer);
//       });
//     });

//     // Step 2: Create form-data and upload PDF directly from buffer
//     const formData = new FormData();
//     formData.append("type", "membersPdf");
//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const fileName = `membership_${timestamp}.pdf`;

//     formData.append("file", pdfBuffer, {
//       filename: fileName,
//       contentType: "application/pdf",
//     });

//     // Step 3: Send POST request to upload the PDF
//     const uploadUrl =
//       "https://customers-dev.5thpillartakaful.com/backend/files/uploadFileWithoutEncryption";

//     const response = await axios.post(uploadUrl, formData, {
//       headers: formData.getHeaders(), // Automatically sets Content-Type with boundary
//     });

//     // Step 4: Return the response from the server
//     console.log("Response from URL:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error generating and uploading PDF:", error);
//     throw error;
//   }
// }

// async function generatePdfAndUpload(replaceData) {
//   try {
//     // Replace data in the HTML template
//     let html = translate("pdfTemplates", "memberShipPdf.body", replaceData);

//     // Step 1: Generate PDF from HTML using Puppeteer
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Set the HTML content for the page
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     // Customize the PDF options
//     const pdfBuffer = await page.pdf({
//       printBackground: true,
//       width: "16in", // Custom width
//       height: "10.6in", // Custom height
//     });

//     // Close Puppeteer
//     await browser.close();

//     // Convert the Buffer into a readable stream
//     const pdfStream = new Readable();
//     pdfStream.push(pdfBuffer);
//     pdfStream.push(null); // End of stream

//     // Step 2: Create form-data and upload PDF directly from buffer
//     const formData = new FormData();
//     formData.append("type", "membersPdf");

//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const fileName = `membership_${timestamp}.pdf`;

//     // Append the stream with filename and content type
//     formData.append("file", pdfStream, {
//       filename: fileName,
//       contentType: "application/pdf",
//     });

//     // Step 3: Send POST request to upload the PDF
//     const uploadUrl =
//       "https://customers-dev.5thpillartakaful.com/backend/files/uploadFileWithoutEncryption";
//     const response = await axios.post(uploadUrl, formData, {
//       headers: formData.getHeaders(),
//     });

//     // Step 4: Return the response from the server
//     console.log("Response from URL:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error generating and uploading PDF:", error);
//     throw error;
//   }
// }

// function formatPakistaniNumber(number) {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
function formatPakistaniNumber(number) {
  if (isNaN(number)) return "Invalid number";

  const [integerPart, decimalPart] = number.toString().split(".");

  // Format only the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part with the decimal part (if any)
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

async function getMemberShipPdf(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );
    console.log("request.query", request.query);
    console.log("request.query.policyId", request.query.policyId);
    const policyId = request.query.policyId;
    console.log("policyId", policyId);

    if (!policyId) {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.policiesNotFound
      );
    }

    // Authenticate user
    let auth = await authenticate();
    console.log("this is the auth response----", auth);

    if (!auth) {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.authFailed
        // "Authentication failed"
      );
    }

    let policy = await getPolicyDetails(request.user.cnic, auth);

    if (!policy) {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.policiesNotFound
      );
    }

    // Filter policies and riders
    let filteredPolicies = filterPolicies(policy);
    for (let i = 0; i < filteredPolicies.length; i++) {
      let filteredRiders = filterRiders(filteredPolicies[i].Riders);
      filteredPolicies[i].Riders = filteredRiders;
    }

    let resp = {
      InsuredInfo: policy.InsuredInfo,
      Policies: filteredPolicies,
    };

    // if (resp && resp.InsuredInfo && resp.InsuredInfo.Gender) {
    //   const gender = resp.InsuredInfo.Gender.toLowerCase(); // Convert to lowercase for case-insensitivity
    //   const prefix =
    //     gender === "male" ? "Mr." : gender === "female" ? "Ms." : "";

    //   console.log("htmlTextForGender", prefix); // Outputs: 'Mr. John Doe' or 'Ms. Jane Doe'
    // }

    // if (
    //   resp &&
    //   resp.InsuredInfo &&
    //   // resp.InsuredInfo.AddressDetails[0].FullAddress
    //   resp.InsuredInfo.FullAddress
    // ) {
    //   // const address = "Shop no 6, first floor, dolman center main tariq road";
    //   var maxLength = 23;
    //   var { addressStart, addressEnd } = splitAddress(
    //     // resp.InsuredInfo.AddressDetails[0].FullAddress,
    //     resp.InsuredInfo.FullAddress,
    //     maxLength
    //   );

    //   console.log("addressStart:", addressStart);
    //   console.log("addressEnd:", addressEnd);
    // }

    if (resp && resp.InsuredInfo && resp.InsuredInfo.AddressDetails) {
      const addressDetails = resp.InsuredInfo.AddressDetails;

      // Find the address where CorresspondenceTag is "Yes"
      let selectedAddress =
        addressDetails.find((addr) => addr.CorresspondenceTag === "Yes") ||
        addressDetails[0]; // Fallback to first address

      if (selectedAddress && selectedAddress.FullAddress) {
        var maxLength = 23;
        var city = selectedAddress.City;
        var { addressStart, addressEnd } = splitAddress(
          selectedAddress.FullAddress,
          maxLength
        );

        console.log("City:", city);
        console.log("addressStart:", addressStart);
        console.log("addressEnd:", addressEnd);
      }
    }

    console.log("typeof policy.PolicyNo:", typeof resp.Policies[0].PolicyNo);
    console.log("typeof policyId:", typeof policyId);

    const policyIndex = resp.Policies.findIndex(
      (policy) => policy.PolicyNo === policyId
    );

    if (policyIndex === -1) {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.policiesNotFound
      );
    }
    console.log("policyIndex", policyIndex);

    const objTmp = {
      LOGOURL: `https://customers-dev.5thpillartakaful.com/logo-PDF.png`,
      // GENDER: prefix ? prefix : "Mr. / Ms.",
      // GENDER:
      //   resp && resp.InsuredInfo.Salutation
      //     ? resp.InsuredInfo.Salutation.toString()
      //     : "Mr. / Ms.",
      FULLNAME1:
        resp && resp.InsuredInfo.FullName
          ? resp.InsuredInfo.Salutation.toString() +
            " " +
            resp.InsuredInfo.FullName.toString()
          : "N/A",
      FULLNAME2:
        resp && resp.InsuredInfo.FullName
          ? resp.InsuredInfo.Salutation.toString() +
            " " +
            resp.InsuredInfo.FullName.toString()
          : "N/A",
      // FULLADDRESS:
      //   resp && resp.InsuredInfo.FullAddress
      //     ? resp.InsuredInfo.FullAddress.toString()
      //     : "N/A",
      STARTADDRESS: addressStart ? addressStart.toString() : "",
      ENDADDRESS: addressEnd ? addressEnd.toString() : "",
      CITY: city ? city.toString() : "",
      MOBILE:
        resp && resp.InsuredInfo.Mobile
          ? resp.InsuredInfo.Mobile.toString()
          : "N/A",
      PHONE:
        resp && resp.InsuredInfo.Phone
          ? resp.InsuredInfo.Phone.toString()
          : "N/A",
      REF:
        resp && resp.Policies[policyIndex].PolicyNo
          ? resp.Policies[policyIndex].PolicyNo
          : "N/A",
      POLICYNO:
        resp && resp.Policies[policyIndex].PolicyNo
          ? resp.Policies[policyIndex].PolicyNo
          : "N/A",
      PLAN:
        resp && resp.Policies[policyIndex].Plan
          ? resp.Policies[policyIndex].Plan.toString()
          : "N/A",
      COMMNCEMENTDATE:
        resp && resp.Policies[policyIndex].CommencementDate
          ? resp.Policies[policyIndex].CommencementDate.toString()
          : "N/A",
      // resp.Policies[policyIndex].TotalModeContribution.toString()
      TOTALMODECONTRIBUTION:
        resp && resp.Policies[policyIndex].TotalModeContribution
          ? formatPakistaniNumber(
              resp.Policies[policyIndex].TotalModeContribution
            )
          : "N/A",
      MODE:
        resp && resp.Policies[policyIndex].Mode
          ? resp.Policies[policyIndex].Mode.toString()
          : "N/A",
      NEXTDUEDATE:
        resp && resp.Policies[policyIndex].NextDueDate
          ? resp.Policies[policyIndex].NextDueDate.toString()
          : "N/A",
      // resp.Policies[policyIndex].TotalRegularPaidContribution.toString()
      TOTALREGULARPAIDCONTRIBUTION:
        resp && resp.Policies[policyIndex].TotalRegularPaidContribution
          ? formatPakistaniNumber(
              resp.Policies[policyIndex].TotalRegularPaidContribution
            )
          : "N/A",
      STATUS:
        resp && resp.Policies[policyIndex].Status
          ? resp.Policies[policyIndex].Status.toString()
          : "N/A",
      // resp.Policies[policyIndex].FaceValue.toString()
      FACEVALUE:
        resp && resp.Policies[policyIndex].FaceValue
          ? formatPakistaniNumber(resp.Policies[policyIndex].FaceValue)
          : "N/A",
      // resp.Policies[policyIndex].CashValue.toString()
      CASHVALUE:
        resp && resp.Policies[policyIndex].CashValue
          ? formatPakistaniNumber(resp.Policies[policyIndex].CashValue)
          : "N/A",
      CASHVALUEDATE:
        resp && resp.Policies[policyIndex].CashValueDate
          ? resp.Policies[policyIndex].CashValueDate.toString()
          : "N/A",
    };

    console.log("==== Replace Data ====", objTmp);

    // Generate PDF and upload
    try {
      const uploadedResponse = await generatePdfAndUpload(objTmp);
      console.log("Upload successful, server response:", uploadedResponse);

      // Ensure response is sent once
      return sendResponse(
        response,
        moduleName,
        200,
        1,
        responseMsgs.recordFetched,
        // "Data fetched",
        uploadedResponse.data
      );
    } catch (error) {
      console.error("Failed to upload PDF:", error);
      return sendResponse(
        response,
        moduleName,
        500,
        0,
        responseMsgs.PdfNotGenerated
        // "PDF generation or upload failed"
      );
    }
  } catch (error) {
    console.log("--- Get Policy API Error - --", error);
    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}

async function generatePdfAndUpload(replaceData) {
  try {
    let html = translate("pdfTemplates", "memberShipPdf.body", replaceData);

    console.log("Puppeteer start");
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Updated for portrait mode
    const pdfBuffer = await page.pdf({
      printBackground: true,
      format: "A4", // Ensures the dimensions are correct for portrait mode
    });

    await browser.close();

    const pdfStream = new Readable();
    pdfStream.push(pdfBuffer);
    pdfStream.push(null); // End of stream

    const formData = new FormData();
    formData.append("type", "membersPdf");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `membership_${timestamp}.pdf`;

    formData.append("file", pdfStream, {
      filename: fileName,
      contentType: "application/pdf",
    });

    const uploadUrl = `${process.env.FILE_SERVICE_URL}/uploadFileWithoutEncryption`;
    const response = await axios.post(uploadUrl, formData, {
      headers: formData.getHeaders(),
    });

    console.log("Response from URL:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating and uploading PDF:", error);
    throw error;
  }
}

function splitAddress(address, maxLength) {
  if (address.length <= maxLength) {
    return { addressStart: address, addressEnd: "" };
  }

  // Find the last space within the maxLength to avoid cutting words
  let splitIndex = address.lastIndexOf(" ", maxLength);

  // If there's no space, split at maxLength
  if (splitIndex === -1) {
    splitIndex = maxLength;
  }

  const addressStart = address.slice(0, splitIndex).trim();
  const addressEnd = address.slice(splitIndex).trim();

  return { addressStart, addressEnd };
}

/** Get Policy **/
async function getPolicy(request, response) {
  try {
    lang = request.header("lang") ? request.header("lang") : lang;
    moduleName = await getModuleNameFromLanguage(lang, "CustomerController");
    responseMsgs = await getResponseMsgsFromLanguage(
      lang,
      "CustomerController"
    );

    let auth = await authenticate();
    console.log("this is the auth response----", auth);

    if (auth) {
      let policy = await getPolicyDetails(request.user.cnic, auth);

      if (policy) {
        let filteredPolicies = filterPolicies(policy);

        for (let i = 0; i < filteredPolicies.length; i++) {
          console.log("policies length", filteredPolicies.length);
          console.log("Element Number", i);

          const currentPolicy = filteredPolicies[i];
          const CashValue = currentPolicy.CashValueRegular || 0;
          const FundStats = currentPolicy.FundStats || [];
          let filteredRiders = filterRiders(filteredPolicies[i].Riders);
          filteredPolicies[i].Riders = filteredRiders;

          if (FundStats.length > 0) {
            const lastIllustration =
              FundStats[FundStats.length - 1].Illustration9 || 0;
            const graphPercentage = lastIllustration
              ? Math.round((CashValue / lastIllustration) * 100)
              : 0;

            console.log("Cash Value", CashValue);
            console.log("lastIllustration", lastIllustration);
            console.log("currentPolicy Status", currentPolicy.Status);

            if (["ANF", "Lapse"].includes(currentPolicy.Status)) {
              console.log("ANF & Lapse Case True");

              currentPolicy.gaugeChart = {
                cashValue: CashValue,
                Illustration: lastIllustration,
                percentage: graphPercentage,
                label: responseMsgs.AFNandLapseCase,
              };
            } else {
              console.log("Status Not Matched");
              // if (graphPercentage >= 0 && graphPercentage < 10) {
              if (graphPercentage <= 10) {
                console.log("From Below 10 Percentage", graphPercentage);
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: graphPercentage,
                  label: responseMsgs.FromBelow10Percentage,
                };
              } else if (graphPercentage >= 11 && graphPercentage <= 50) {
                console.log("From 11 to 50 Percentage", graphPercentage);
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: graphPercentage,
                  label: responseMsgs.From11to50Percentage,
                };
              } else if (graphPercentage >= 51 && graphPercentage <= 80) {
                console.log("From 51 to 80 Percentage", graphPercentage);
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: graphPercentage,
                  label: responseMsgs.From51to80Percentage,
                };
              } else if (graphPercentage >= 81 && graphPercentage <= 99) {
                console.log("From 81 to 100 Percentage", graphPercentage);
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: graphPercentage,
                  label: responseMsgs.From81to100Percentage,
                };
              } else if (graphPercentage >= 100) {
                console.log(
                  "Greater than or equals to  100 Percentage",
                  graphPercentage
                );
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: 100,
                  label: responseMsgs.From100Percentage,
                };
              } else {
                // Optional: Assign a default gaugeChart if no condition is met
                console.log("Graph percentage out of range", graphPercentage);
                currentPolicy.gaugeChart = {
                  cashValue: CashValue,
                  Illustration: lastIllustration,
                  percentage: 0,
                  label: "No data available",
                };
              }
            }
          }
        }

        if (policy && policy.InsuredInfo && policy.InsuredInfo.AddressDetails) {
          const addressDetails = policy.InsuredInfo.AddressDetails;

          let selectedAddress =
            addressDetails.find((addr) => addr.CorresspondenceTag === "Yes") ||
            addressDetails[0];

          if (selectedAddress && selectedAddress.FullAddress) {
            Object.assign(policy.InsuredInfo, selectedAddress);
          } else {
            selectedAddress = {
              FullAddress: "",
              Country: "",
              Province: "",
              City: "",
            };
            Object.assign(policy.InsuredInfo, selectedAddress);
          }
        }

        let resp = {
          InsuredInfo: policy.InsuredInfo,
          Policies: filteredPolicies,
        };
        let systemLogsData = {
          userId: request.user._id,
          userIp: request.ip,
          roleId: request.user.roleId,
          module: moduleName,
          action: "policy",
          data: resp,
        };
        let systemLogs = await systemLogsHelper.composeSystemLogs(
          systemLogsData
        );

        return sendResponse(
          response,
          moduleName,
          200,
          1,
          responseMsgs.recordFetched,
          resp
        );
        // }
        return sendResponse(
          response,
          moduleName,
          422,
          0,
          responseMsgs.customerNotFound
        );
      }
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.authFailed
      );
    } else {
      return sendResponse(
        response,
        moduleName,
        422,
        0,
        responseMsgs.customerNotFound
      );
    }
  } catch (error) {
    console.log("--- Get Policy API Error ---", error);

    return sendResponse(
      response,
      moduleName,
      500,
      0,
      responseMsgs.error_500
      // "Something went wrong, please try again later."
    );
  }
}
