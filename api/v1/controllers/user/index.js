const { logger } = require("../../../helpers/logger");
const nodeAcl = require("../../../helpers/acl-middleware/acl-permissions.js");
var ResHelper = require(_pathconst.FilesPath.ResHelper);
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);
var UserService = require(_pathconst.ServicesPath.UserService);
var UserValidationV1 = require(_pathconst.ReqModelsPath.UserValidationV1);
let bcrypt = require('bcrypt')



const signUp = async (req, res, next) => {
    try {
        const { error } = UserValidationV1.signUp.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { email, role, name, password } = req.body;
            let user = await UserService.findUser(email);
            if (!user) {
                role = await UserService.findRole(role);
                password = await bcrypt.hash(password, 10);
                user = await UserService.signUp({ email,  role: role.id, name, password });
                nodeAcl.nodeAcl.addUserRoles(user.id, role.name);//Users
                ResHelper.apiResponse(res, true, "Success", 201, user, "");
            } else {
                ResHelper.apiResponse(res, false, "User already exists", 204, {}, "");
            }
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}

// }

module.exports = {
    signUp
};


