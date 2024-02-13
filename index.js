const http = require("http");
const StatusCodes = require("./constants/httpStatusCodes");
const {
  getProducts,
  getProduct,
  createProduct,
} = require("./controllers/productController");

const env = require("./config/env");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/^\/api\/products\/([0-9]+)$/)) {
    const id = req.url.split(`/`).pop() ?? "0";
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(StatusCodes.NOT_FOUND, {
      "Content-Type": "application/json ",
    });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
  //res.statusCode = StatusCodes.OK;
  //res.setHeader("Content-Type", "application/json");
  // Alternative to writing the previous two lines: writeHead() method
  // Example

  // res.writeHead(200, { "Content-Type": "application/json" });
  //res.write(JSON.stringify(products));
  //res.end();
  // Alternative to the previous two lines
  // You can send the data to res.end() directly without calling write()

  // res.end((JSON.stringify(products));
});

const PORT = parseInt(env.api.port, 10);

server.listen(PORT, () => console.log("Server running on port " + PORT));
