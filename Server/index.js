const express = require("express");
const bodyParser = require("body-parser");
const ibanLib = require("iban");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

const router = express.Router();

let count = 0;

router.post("/", (req, res, next) => {
  const { iban } = req.body;
  try {
    if (++count % 3 === 0) {
      throw new Error("Service is not available");
    }
    if (!iban) {
      return res
        .status(400)
        .json({ message: "Body should contain iban field" });
    }
    const valid = ibanLib.isValid(iban);
    res.json(valid);
  } catch (e) {
    res.status(500).json({
      message: e.message || "Something went wrong. Please, try again"
    });
  }
});

app.use("/", router);

app.listen(3050, err => {
  if (err) {
    throw err;
  }
  console.info("Server is listening on port 3050");
});
