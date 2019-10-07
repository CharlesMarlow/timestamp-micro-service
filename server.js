const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = (module.exports = express());
app.use(bodyParser.json());
app.use(cors);

// endpoint setup
app.get("/dateValues/:dateVal", (req, res, next) => {
  const dateVal = req.params.dateVal;
  // formatting options
  const dateFormattingOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  if (isNaN(dateVal)) {
    let naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString(
      "en-US",
      dateFormattingOptions
    );
    let unixDate = new Date(dateVal).getTime() / 1000;
  } else {
    let unixDate = dateVal;
    let naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString(
      "en-US",
      dateFormattingOptions
    );
  }

  res.json({
    unix: unixDate,
    natural: naturalDate
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000. This is great news!");
});
