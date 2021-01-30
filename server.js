const express = require("express");
const app = express();
const connection = require("./config/connection");
const notFound = require("./middlewares/ErrorHandler");
const errorHandling = require("./middlewares/ErrorHandler");
const config = require("config");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

connection();
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/uploadImage", require("./routes/uploadRoutes"));
app.get("/api/clientId", (req, res) => res.send(config.get("clientId")));
// app.use("/api/users", require("./routes/users"));
// app.use("/api/contacts", require("./routes/contacts"));
// app.use("/api/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandling);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`.green.bold));
