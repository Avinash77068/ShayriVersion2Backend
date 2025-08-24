// swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Shayri API",
    description: "All Shayri Collection",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],

  // 👇 add this
//   basePath: "/api/v2",   // Swagger v2
  servers: [
    { url: "http://localhost:3000/" }  // Swagger v3+
  ]
};


const outputFile = "./swagger-output.json"; // JSON generate hoga
const routes = ["./server.js"];         // server entry point

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
