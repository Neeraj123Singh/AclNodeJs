
const aclPermissions = require('../../../helpers/acl-middleware/acl-helper.js');

const express = require("express");


const router = express.Router();
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);
var ProductControllerV1 = require(_pathconst.ControllersPath.ProductControllerV1);

router.post("/createProduct", AuthHelper.authorize, aclPermissions.getPermissions, ProductControllerV1.createProduct);
router.post("/getAllProduct", AuthHelper.authorize, aclPermissions.getPermissions, ProductControllerV1.getAllProduct);
router.post("/deleteProduct", AuthHelper.authorize, aclPermissions.getPermissions, ProductControllerV1.deleteProduct);
router.post("/updateProduct", AuthHelper.authorize, aclPermissions.getPermissions, ProductControllerV1.updateProduct);
// getAllProduct

//router.post("/loginCEO", AuthHelper.authorize, aclPermissions.getPermissions, UserControllerV1.get);


module.exports = router;