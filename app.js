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

console.log(process.env.NODE_ENV);
console.log(process.env.DATABASE_URL);

///////////////////////////////////////////////////////
/// Config for auth
///////////////////////////////////////////////////////

const signingPrivateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIGSTUi4/MKS6laRoj5Cirazy2gkKpBu6c0I6c/TXUvQu
-----END PRIVATE KEY-----`;
const apiKey = "DNLYHGAjm1VW6kJykit5Jn0XNdI5lmQY5m6wAbgIU7h4L1jUIFRr4HqeOsmvLevW";


/// Initialize Credify
const credify = new Credify(signingPrivateKey, apiKey, { mode: "development" });

app.use(middleware({ db, credify }));

app.use("/data-receiver", dataReceiver({ db, credify }));
app.use("/data-provider", dataProvider({ db, credify }));

/// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

