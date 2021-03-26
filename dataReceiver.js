const { Router } = require("express");
const {dataReceiverConfig} = require("./config");
const { extractAccessToken } = require("./utils");

const organizationId = dataReceiverConfig.id;
const redirectUrl = dataReceiverConfig.redirectUrl;
const scopes = dataReceiverConfig.scopes;

module.exports = ({ db, credify }) => {
  const api = Router();

  api.get('/oidc', async (req, res) => {
    const state = Math.random().toString();
    // const options = { state, responseMode: "fragment", responseType: "token" };
    const options = { state };
    if (req.query.phone_number) {
      options.phoneNumber = req.query.phone_number;
    } else if (req.query.credify_id) {
      options.userId = req.query.credify_id;
    }
    if (req.query.offer_code) {
      options.offerCode = req.query.offer_code;
    }

    try {
      const { oidcUrl, privateKey } = await credify.oidc.initiateOIDC(organizationId, redirectUrl, scopes, options);

      await db.Request.create({
        state,
        privateKey,
        offerCode: options.offerCode || ""
      });

      console.log(oidcUrl);

      res.redirect(oidcUrl);
    } catch (e) {
      res.send(e);
    }
  });

  api.post("/oidc", async (req, res) => {
    if (!req.body.access_token || !req.body.state) {
      return res.status(400).send({ message: "Invalid body" });
    }
    const accessToken = req.body.access_token;
    const state = req.body.state;

    try {

      const request = await db.Request.findAll({ where: { state } });
      if (request.length < 1) {
        throw new Error("Request not found.");
      }
      const encryptionPrivateKey = request[0].privateKey;

      const data = await credify.oidc.userinfo(accessToken, encryptionPrivateKey);

      // NOTE: You can handle whatever you want. Offer redemption, as well.

      res.send({ ...data });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  api.get("/user-existence", async (req, res) => {
    const token = extractAccessToken(req);
    const isValid = await credify.auth.introspectToken(token, "claim_provider:read_user_existence");
    if (!isValid) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    const phoneNumber = req.query.phone_number;
    const idNumber = req.query.id_number;
    const document = req.query.id_document;
    if (!phoneNumber && !idNumber && !document) {
      return res.status(400).send({ message: "Invalid query" });
    }
    if (!phoneNumber) {
      return res.status(403).send({ message: "This does not support checking with ID" });
    }
    try {
      const r = await db.User.findAll({ where: { hashedPhoneNumber: phoneNumber } });
      const exists = r.length > 0;
      res.send({ data: { exists } });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return api;
};
