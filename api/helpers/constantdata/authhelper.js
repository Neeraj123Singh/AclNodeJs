const { compare } = require('bcrypt');
var jwt = require('jwt-simple')
var moment = require('moment');
const User = require('../../../models/User');
var ResHelper = require(_pathconst.FilesPath.ResHelper);
var CommonHelper = require(_pathconst.FilesPath.CommonHelper);
var UserService = require(_pathconst.ServicesPath.UserService);

/** 
 * @api {function} createJWToken createJWToken
 *  @apiName createJWToken
 *  @apiGroup AuthHelper
 *  @apiParam {object}  user A object of user information  .
 *  @apiDescription Create unique token with 1 minutes expire time .
 */

const compareDateString = (dt1,dt2)=>{
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    dt1 = dt1.toUTCString() + dt1.getMilliseconds();
    dt2 = dt2.toUTCString() + dt2.getMilliseconds();
    console.log(dt1,dt2)
    return dt1==dt2;
}
exports.createJWToken = async function (user) {
    delete user.password;
    var payload = {
        user: user,
        iat: moment().unix(),
        exp: Math.floor(Date.now() / 1000) + (10 * 60 * 144)//Token for a 10 minutes
    }
    return jwt.encode(payload, process.env.TOKEN_SECRET)
}

/**
 * @api {function} authorize authorize
 *  @apiName authorize
 *  @apiGroup AuthHelper
 *  @apiParam {object}  req A object of Request Call from Client  .
 *  @apiParam {object}  res A object of Response Call to Client .
 *  @apiParam {callback}  next A Callback to pass request to next midleware .
 *  @apiDescription A midleware to authorize the REST call .
 */
exports.authorize = async function (req, res, next) {
    var resModel = {
        Status: false,
        Message: "",
        Data: {}
    };
    if (!req.header('Authorization')) {
        resModel.Message = 'Please make sure your request has an Authorization header';
        return res.status(401).send(resModel);
    }
    var token = req.header('Authorization');
    var payload = null
    try {
        payload = jwt.decode(token, process.env.TOKEN_SECRET)
    } catch (err) {
        resModel.Message = " Invalid Status ";
        return res.status(401).send(resModel);
    }
    if (payload.exp <= moment().unix()) {
        resModel.Message = 'Token has expired';
        return res.status(401).send(resModel);
    }


    req.userId = payload.userId;
    req.loggedInUser = payload.user;
    next()

}
exports.getRequestingUser = function (token) {
    var decoded = jwt.decode(token, Config.TOKEN_SECRET);
    return decoded.user;
}


exports.isSuperAdmin = (req, res, next) => {
    if (req.loggedInUser.type === 1) {
        next();
    }
    else {
        ResHelper.apiResponse(res, false, "Permission denied", 401, {}, "");
    }
}

exports.externalAuth = (req, res, next) => {
    var resModel = {
        Status: false,
        Message: "",
        Data: {}
    };
    if (!req.header('Authorization')) {
        resModel.Message = 'Please make sure your request has an Authorization header';
        return res.status(401).send(resModel);
    }else{
        if(req.header('Authorization')=== process.env.AUTH_KEY_EXTERNAL){
            next();
        }else{
            resModel.Message = 'Invalid Token ';
            return res.status(401).send(resModel);   
        }
    }
}