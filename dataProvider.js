const {composeClaimObject, evaluateOffer, personalizeOffers, scopeNames} = require("./utils");

const { Op } = require('sequelize');
const faker = require("faker");
const { Router } = require("express");

module.exports = ({ db, credify }) => {
  const api = Router();

  api.get('/demo-user', async (req, res) => {
    try {
      const id = faker.random.number(5000);
      const user = await db.User.findByPk(id);
      res.json(user);
    } catch (e) {
      res.json({ error: { message: e.message } });
    }
  });

  api.post("/create", async (req, res) => {
    if (!req.body.id || !req.body.password) {
      return res.status(400).send({ message: "Invalid body" });
    }

    try {
      const internalId = req.body.id;
      const password = req.body.password;
      const user = await db.User.findByPk(internalId);
      const profile = {
        name: {
          first_name: user.firstName,
          last_name: user.lastName,
        },
        phones: [
          {
            phone_number: user.phoneNumber,
            country_code: user.phoneCountryCode,
          }
        ],
        emails: [
          {
            email: user.email,
          }
        ]
      };

      const id = await credify.entity.create(profile, password);
      await user.update({ credifyId: id });

      const claims = composeClaimObject(user, scopeNames);
      const commitments = await credify.claims.push(id, claims);

      console.log(commitments);
      // TODO: store 'commitments' to DB

      res.json({ id });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  // This is called by Credify's Backend.
  api.get("/offers-filtering", async (req, res) => {
    const credifyId = req.body.credify_id;
    const localId = req.body.local_id;
    const offers = req.body.offers;
    if (!credifyId && !localId) {
      return res.status(400).send({ message: "No ID found" });
    }
    if (offers === undefined) {
      return res.status(400).send({ message: "Invalid body" });
    }

    try {
      if (!offers.length) {
        return res.send({ offers: [] })
      }
      let user;

      if (credifyId) {
        const users = await db.User.findAll({ where: { credifyId } });
        if (users.length !== 1) {
          throw new Error("Not found user properly");
        }
        user = users[0];
      } else if (localId) {
        user = await db.User.findByPk(localId);
      }
      const personalizedOffers = personalizeOffers(user, offers);

      const response = {
        data: {
          offers: personalizedOffers,
        },
      };
      res.json(response);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  // This is called by Credify's Backend.
  api.post("/user-counts", async (req, res) => {
    const ids = req.body.ids;
    const conditions = req.body.conditions;

    if (ids === undefined || !conditions) {
      return res.status(400).send({ message: "Invalid body" });
    }

    try {
      const users = await db.User.findAll({
        where: {
          'credifyId': {
            [Op.notIn]: ids, // remove users who have used an offer to this data receiver.
          },
        }
      });

      let counts = Array(conditions.length).fill(0);

      users.forEach((user) => {
        for (let i = 0; i < conditions.length; i++) {
          const res = evaluateOffer(user, [conditions[i]], scopeNames);
          counts[i] += res.rank;
        }
      });

      const response = {
        data: {
          counts
        }
      };
      res.json(response);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  // This is called by Credify's Backend.
  api.post("/offer-evaluation", async (req, res) => {
    if (!req.body.credify_id || !req.body.conditions || !req.body.scopes) {
      return res.status(400).send({ message: "Invalid body" });
    }

    try {
      const users = await db.User.findAll({ where: { credifyId: req.body.credify_id } });
      if (users.length !== 1) {
        throw new Error("Not found user properly");
      }
      const user = users[0];

      const result = evaluateOffer(user, req.body.conditions, req.body.scopes);

      const response = {
        data: {
          rank: result.rank,
          used_scopes: result.usedScopes,
          required_scopes: result.requiredScopes,
        }
      };
      res.json(response);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  // This is called by Credify's Backend.
  api.post("/encrypted-claims", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(" ")) {
      return res.status(401).send("Unauthorized");
    }
    const accessToken = authHeader.split(" ")[1];

    if (!req.body.user_id || !req.body.request_token || !req.body.approval_token) {
      return res.status(400).send({ message: "Invalid body" });
    }

    const credifyId = req.body.user_id;
    const requestToken = req.body.request_token;
    const approvalToken = req.body.approval_token;
    try {
      const { publicKey, scopes } = await credify.claims.validateRequest(accessToken, requestToken, approvalToken);

      const users = await db.User.findAll({ where: { credifyId } });
      if (users.length !== 1) {
        throw new Error("Not found user properly");
      }
      const user = users[0];

      const claims = composeClaimObject(user, scopes);

      const encrypted = await credify.claims.encrypt(claims, publicKey);
      const data = {
        data: {
          claims: encrypted
        }
      };
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  });

  return api;
};
