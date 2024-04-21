require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./auth");
const { AppError } = require("../lib/utils");
const { CelebrateError } = require("celebrate");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.method} ${req.path}`,
    data: null,
  });
});

app.use((err, _, res, __) => {
  if (err instanceof CelebrateError) {
    const messages = [];
    err.details.forEach((error) => {
      messages.push(error.message.replace(/\"/g, ""));
    });
    err.code = 400;
    err.message = messages?.[0] || "Bad request";
  }
  const error = new AppError(
    err.code || err.statusCode || 500,
    err.message || "Internal server error"
  );
  res.status(error.code).json({
    status: error.status,
    message: error.message,
    data: null,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
