const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./database/models");
const dataProvider = require("./dataProvider");
const dataReceiver = require("./dataReceiver");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 8000;

app.use("/data-receiver", dataReceiver({ db }));
app.use("/data-provider", dataProvider({ db }));

/// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

