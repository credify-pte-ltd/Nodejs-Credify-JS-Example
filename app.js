const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Credify } = require("credify-nodejs");
const middleware = require("./middleware");
const db = require("./database/models");
const dataProvider = require("./dataProvider");
const dataReceiver = require("./dataReceiver");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 8000;

///////////////////////////////////////////////////////
/// Config for auth
///////////////////////////////////////////////////////

const dataProviderConfig = {
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIIEmS6biY6oGC6sR5vZEBcjKe1Z0cVhJW78yf7pZobp7
  -----END PRIVATE KEY-----`,
  apiKey: "vEKTWiDqLLKr8mxIOLQq0hypkCoxw3fUbFPYHgb4ZrYQMjVRs5RnSzY9NMoOXBBS",
};
const dataReceiverConfig = {
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIN6LT1I4RRSLiWLHyRdrn/OSSgTzpbiijgVvT7y46S2w
  -----END PRIVATE KEY-----`,
  apiKey: "wm7fFfWkVnkvvkjR3lv0JknI89xRvu3nr3pxSFmMSe2DqlW5MuRXcujata7OGafQ",
  email: "Ila43@gmail.com",
  password: "Sjypajfhwp605@",
};


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

