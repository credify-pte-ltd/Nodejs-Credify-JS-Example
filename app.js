const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Credify } = require("credify-nodejs");
const middleware = require("./middleware");
const db = require("./database/models");
const dataProvider = require("./dataProvider");
const dataReceiver = require("./dataReceiver");
const { dataReceiverConfig, dataProviderConfig } = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 8000;

/// Initialize Credify
const dpCredify = new Credify(dataProviderConfig.signingPrivateKey, dataProviderConfig.apiKey, { mode: "development" });
const drCredify = new Credify(dataReceiverConfig.signingPrivateKey, dataReceiverConfig.apiKey, { mode: "development" });

app.use(middleware({ db, dp: dpCredify, dr: drCredify }));

app.use("/data-receiver", dataReceiver({ db, credify: drCredify }));
app.use("/data-provider", dataProvider({ db, credify: dpCredify }));

/// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

