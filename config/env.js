require("process");
require("dotenv").config();

const env = {
  api: {
    name: process.env.API_NAME || "api",
    root: process.env.API_ROOT || "/",
    port: process.env.PORT || "5000",
  },
};

module.exports = env;
