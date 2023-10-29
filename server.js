const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("express server is started");
  console.log(`environment is ${process.env.NODE_ENV}`);
  console.log(`port number is ${app.get("port")}`);
});
