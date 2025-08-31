// Runtime exports (will appear in index.js)
export var API_BASE_URL = 'http://localhost:3000';
export var createApiResponse = function (data) { return ({
    success: true,
    data: data
}); };
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
