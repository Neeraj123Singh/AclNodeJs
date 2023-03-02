

var Joi = require("joi");

const createProduct= Joi.object({
    name: Joi.string()
      .required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  });

const getAllProduct= Joi.object({
    pageNumber: Joi.number().allow(null),
  pageSize: Joi.number().allow(null)
  });

  const deleteProduct= Joi.object({
     id:Joi.string().required()
  });

  const updateProduct= Joi.object({
    id:Joi.string().required(),
    name: Joi.string()
    .required(),
  price: Joi.number().required(),
  quantity: Joi.number().required()
 });
 const bookProduct= Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.number().required()
});

const cancelProduct= Joi.object({
  product_id: Joi.string().required()
});

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    bookProduct,
    cancelProduct
}