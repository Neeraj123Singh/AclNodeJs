const { logger } = require("../../../helpers/logger");
const nodeAcl = require("../../../helpers/acl-middleware/acl-permissions.js");
var ResHelper = require(_pathconst.FilesPath.ResHelper);
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);
var ProductService = require(_pathconst.ServicesPath.ProductService);
var ProductValidationV1 = require(_pathconst.ReqModelsPath.ProductValidationV1);
let bcrypt = require('bcrypt')



const createProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.createProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { name,price,quantity } = req.body;
            await ProductService.createProduct(name,price,quantity);
            ResHelper.apiResponse(res, true, "Success", 200, {}, "");
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.getAllProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { pageNumber,pageSize } = req.body;
            if(!pageNumber){
                pageNumber= 0;
            }
            if(!pageSize){
                pageSize=100;
            }
            let products = await ProductService.getAllProduct(pageNumber*pageSize,pageSize);
            ResHelper.apiResponse(res, true, "Success", 200, products, "");
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}
// }
const deleteProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.deleteProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { id} = req.body;
            let product = await ProductService.getProduct(id);
            if(!product){
                ResHelper.apiResponse(res, false, "No Such Product Found", 201, {}, "");
            }else{
                await ProductService.deleteProduct(id);
                ResHelper.apiResponse(res, true, "Success", 201, {}, "");
            }
         
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.updateProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { id,name ,price ,quantity} = req.body;
            let product = await ProductService.getProduct(id);
            if(!product){
                ResHelper.apiResponse(res, false, "No Such Product Found", 201, {}, "");
            }else{
                await ProductService.updateProduct(name ,price ,quantity,id);
                ResHelper.apiResponse(res, true, "Success", 201, {}, "");
            }
         
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}
module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};


