const { Router } = require("express");

const organizationId = "37c5abfa-a4b7-4521-a312-89a2ec53e804";
const redirectUrl = "http://localhost:3000/callback";
const scopes = ["openid", "phone", "email", "profile"];

module.exports = ({ db, credify }) => {
  const api = Router();

  api.get('/oidc', async (req, res) => {
    const state = Math.random().toString();
    const options = { state };
    if (req.query.phone_number) {
      options.phoneNumber = req.query.phone_number;
    } else if (req.query.credify_id) {
      options.userId = req.query.credify_id;
    } else if (req.query.offer_code) {
      options.offerCode = req.query.offer_code;
    }

    try {
      const { oidcUrl, privateKey } = await credify.oidc.initiateOIDC(organizationId, redirectUrl, scopes, options);

      await db.Request.create({
        state,
        privateKey,
        offerCode: options.offerCode || ""
      });

      res.send({ url: oidcUrl });
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

  return api;
};
