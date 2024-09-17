require("dotenv").config();
const express = require("express");
const user = require("./routes/user");
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { ErrorHandler } = require("./middlewares/error");
const Logger = require("./middlewares/log");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// const http = require("http");
// const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));

//parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Logger middleware
app.use(Logger.logRequest);
const EndpointHead = process.env.Endpoint;

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Xarme",
      version: "1.0.0",
      description: "Api documentation of Xarme",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: `${process.env.URL}${EndpointHead}`,
      },
    ],
  },
  apis: ["./models/*js", "./controller/*js"],
};

const spacs = swaggerjsdoc(options);
app.use(`${EndpointHead}/api-docs`, swaggerUi.serve, swaggerUi.setup(spacs));

app.use(`${EndpointHead}/auth`, auth);
app.use(`${EndpointHead}/user`, user);
app.use(`${EndpointHead}/admin`, admin);

// Error handler middleware
app.use(ErrorHandler);

//ini my database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Xarme",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, function () {
  console.log(`App is Listening http://localhost:8000${EndpointHead}`);
});
