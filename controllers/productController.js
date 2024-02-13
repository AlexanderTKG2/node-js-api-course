const Product = require("../models/productModel");
const StatusCodes = require("../constants/httpStatusCodes");
const { getPostData } = require("../util");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.statusCode = StatusCodes.OK;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error.message);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(StatusCodes.NOT_FOUND, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    }

    res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error.message);
    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    return res.end(JSON.stringify({ message: error.message }));
  }
}

async function createProduct(req, res) {
  try {
    // returns request body as JSON string
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(StatusCodes.CREATED, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error.message);
    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    return res.end(JSON.stringify({ message: error.message }));
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
