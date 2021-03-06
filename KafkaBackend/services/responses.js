const prepareSuccess = (data = {}) => {
    //console.log(data);
    const responseData = {
        code: 200,
        data: {
            success: true,
            message: "Successful",
            ...data
        }
    };
    //console.log("preparing success response with code 200");
    //console.log(responseData);
    return responseData;
}

const prepareNoContent = (data ={}) =>{
    const responseData = {
        code: 204,
        data: {
            success: true,
            message: "No content",
            ...data
        }
    };
    console.log("preparing No content response with code 204");
    console.log(responseData);
    return responseData;
}
const prepareAuthenticationFailure = (data = {}) => {
    const responseData = {
        code: 401,
        data: {
            success: false,
            message: "The username or password you entered is incorrect.",
            ...data
        }
    };
    console.log("preparing Authentication Failure response with code 401");
    console.log(responseData);
    return responseData;
}

const prepareAuthorizationFailure = (data = {}) => {
    const responseData = {
        code: 403,
        data: {
            success: false,
            message: "User is not authorized to perform this action",
            ...data
        }
    };
    console.log("preparing Authorization Failure response with code 403");
    console.log(responseData);
    return responseData;
}

const prepareInternalServerError = (data = {}) => {
    const responseData = {
        code: 500,
        data: {
            success: false,
            message: "Internal Server Error",
            ...data
        }
    };
    console.log("preparing internal server error response with code 500");
    console.log(responseData);
    return responseData;
}

const prepareResourceConflictFailure = (resp, data = {}) => {
    const responseData = {
        code: 409,
        data: {
            success: false,
            message: "Resource Conflict",
            ...data
        }
    };
    console.log("preparing resource conflict error response with code 409");
    console.log(responseData);
    return responseData;
}

module.exports = { prepareSuccess, prepareNoContent,
     prepareAuthenticationFailure, prepareAuthorizationFailure,
      prepareInternalServerError, prepareResourceConflictFailure };