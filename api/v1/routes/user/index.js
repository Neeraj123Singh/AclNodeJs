var UserControllerV1 = require(_pathconst.ControllersPath.UserControllerV1);
const aclPermissions = require('../../../helpers/acl-middleware/acl-helper.js');

const express = require("express");

const router = express.Router();
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);
router.post("/signUp", UserControllerV1.signUp);
router.post("/login", UserControllerV1.login);
module.exports = router;