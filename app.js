const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Credify = require("credify-nodejs");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8000;


///////////////////////////////////////////////////////
/// Config for auth
///////////////////////////////////////////////////////

const signingPrivateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIGSTUi4/MKS6laRoj5Cirazy2gkKpBu6c0I6c/TXUvQu
-----END PRIVATE KEY-----`;
const apiKey = "DNLYHGAjm1VW6kJykit5Jn0XNdI5lmQY5m6wAbgIU7h4L1jUIFRr4HqeOsmvLevW";


///////////////////////////////////////////////////////
/// Config for OIDC Client
///////////////////////////////////////////////////////

const organizationId = "37c5abfa-a4b7-4521-a312-89a2ec53e804";
const redirectUrl = "http://localhost:3000/callback";
const scopes = ["openid", "phone", "email", "profile"];


///////////////////////////////////////////////////////
/// Config for Claim Provider
///////////////////////////////////////////////////////

const claims = {
  scopenamea: {
    // NOTE: This needs to be actual user's data.
    claimnamea: 123,
  },
  scopenameb: {
    claimnameb: "test"
  },
};


/// Initialize Credify
const credify = new Credify(signingPrivateKey, apiKey, { mode: "development" });


///////////////////////////////////////////////////////
/// Handlers for data receiving services
///////////////////////////////////////////////////////

app.get("/oidc", async (req, res) => {
  const state = Math.random().toString();
  const options = { state };
  if (req.query.phone_number) {
    options.phoneNumber = req.query.phone_number;
  } else if (req.query.entity_id) {
    options.userId = req.query.entity_id;
  }
  console.log(req.query);

  const { oidcUrl, privateKey } = await credify.oidc.initiateOIDC(organizationId, redirectUrl, scopes, options);

  // TODO: store this 'privateKey' along with 'state' to DB
  console.log(state, privateKey);

  res.send({ url: oidcUrl });
});

app.post("/oidc", async (req, res) => {
  const accessToken = req.body.access_token;
  const state = req.body.state;

  // TODO: find the private key by state
  const encryptionPrivateKey = "";

  const data = await credify.oidc.userinfo(accessToken, encryptionPrivateKey);
  console.log(data);

  // NOTE: You can handle whatever you want. Offer redemption, as well.

  res.send({ ...data });
});


///////////////////////////////////////////////////////
/// Handlers for data providing services
///////////////////////////////////////////////////////

app.post("/create", async (req, res) => {
  const profile = req.body.profile;
  const password = req.body.password;
  const id = await credify.entity.create(profile, password);

  const commitments = await credify.claims.push(id, claims);

  // TODO: store this 'id' and 'commitments' to DB
  res.send({ id });
});

app.post("/user-counts", async (req, res) => {
  res.send("coming soon.");
});

app.post("/offer-evaluate", async (req, res) => {
  res.send("coming soon.");
});

app.post("/encrypted-claims", async (req, res) => {
  res.send("coming soon.");
});


/// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

