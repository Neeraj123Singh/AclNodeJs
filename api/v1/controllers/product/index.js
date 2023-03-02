const { logger } = require("../../../helpers/logger");
const nodeAcl = require("../../../helpers/acl-middleware/acl-permissions.js");
var ResHelper = require(_pathconst.FilesPath.ResHelper);
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);
var ProductService = require(_pathconst.ServicesPath.ProductService);
var ProductValidationV1 = require(_pathconst.ReqModelsPath.ProductValidationV1);
let bcrypt = require('bcrypt');
const { use } = require("chai");



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

const bookProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.bookProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { product_id,quantity} = req.body;
            let user_id = req.loggedInUser.id;
            console.log(req.loggedInUser)
            let userProduct = await ProductService.getUserProduct(user_id,product_id);
            console.log(userProduct)
            if(userProduct){
                ResHelper.apiResponse(res, false, "Product already exists ", 401, {}, "");
            }
            let product = await ProductService.getProduct(product_id);
            if(!product){
                ResHelper.apiResponse(res, false, "No Such Product Found", 401, {}, "");
            }else{
                if(product.quantity<quantity){
                    ResHelper.apiResponse(res, false, "InSufficient Stock", 401, {}, "");
                }
                await ProductService.bookProduct(user_id,product_id,quantity);
                await ProductService.updateProduct(product.name,product.price,product.quantity-quantity,product.id)
                ResHelper.apiResponse(res, true, "Success", 201, {}, "");
            }
         
        }
    }
    catch (e) {
        logger.error(e)
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}


const cancelProduct = async (req, res, next) => {
    try {
        const { error } = ProductValidationV1.cancelProduct.validate(req.body);
        if (error) {
            ResHelper.apiResponse(res, false, error.message, 401, {}, "");
        } else {
            let { product_id} = req.body;
            let user_id = req.loggedInUser.id;
            let userProduct = await ProductService.getUserProduct(user_id,product_id);
            if(!userProduct){
                ResHelper.apiResponse(res, false, "No such user Product already exists ", 401, {}, "");
            }
            let product = await ProductService.getProduct(product_id);
            if(!product){
                ResHelper.apiResponse(res, false, "No Such Product Found", 401, {}, "");
            }else{
                await ProductService.cancelProduct(product_id,user_id);
                await ProductService.updateProduct(product.name,product.price,product.quantity+userProduct.quantity,product.id)
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
    deleteProduct,
    bookProduct,
    cancelProduct
};


