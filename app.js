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

export const dataProviderConfig = {
  id: "f70ba67a-f70a-4f1a-b30c-b7c94da18ce2",
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIIFAGP2cc2Ld9vOnfKv7LZLRDihXq6c4NB/5zCWzT4u7
  -----END PRIVATE KEY-----`,
  apiKey: "8rsHuj7ZVo1HAZrxBqe7G1nQrq4c8orszhwYOK9bG79dfXJWpFqiHgzJvqkg5QB5",
  email: "Taya23@hotmail.com",
  password: "Ifkhprwzof33@",
};
export const dataReceiverConfig = {
  id: "784eb1d5-0879-4969-abc4-d407350de697",
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIK7jHzN4LWqDOf39WhUSxkNNRyAJ5gPNIktdsZh2QYln
  -----END PRIVATE KEY-----`,
  apiKey: "aRJGs2b7YzkxSCc9ELiuRPMRLSWl7ElVJDzBIdTYBWS7QaZ9M3tHnkMd7VfXRpet",
  email: "Korey_Becker@gmail.com",
  password: "Nmdpauzpfx134@",
  redirectUrl: "https://ruby.biz",
  scopes: ["openid", "phone", "email", "profile"],
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

