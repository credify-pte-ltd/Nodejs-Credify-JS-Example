const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Credify = require("credify-nodejs");
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
MC4CAQAwBQYDK2VwBCIEIGSTUi4/MKS6laRoj5Cirazy2gkKpBu6c0I6c/TXUvQu
-----END PRIVATE KEY-----`,
  apiKey: "DNLYHGAjm1VW6kJykit5Jn0XNdI5lmQY5m6wAbgIU7h4L1jUIFRr4HqeOsmvLevW",
};
const dataReceiverConfig = {
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIABkaJ1reetSmR+9JaPSNwc9xwrt8xGB+JHrChmu67gk
-----END PRIVATE KEY-----`,
  apiKey: "5003Oa4jPvqrT07ivhd8m0D0yiCBtTnqJYniZGnx69d2MswnnMyYLDWNQWQPTz5r",
  email: "Leif55@gmail.com",
  password: "Mfnnbmuiuu18@",
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

