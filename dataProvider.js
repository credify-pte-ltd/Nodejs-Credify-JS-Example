const faker = require("faker");
const { Router } = require("express");

const claims = {
  scopenamea: {
    // NOTE: This needs to be actual user's data.
    claimnamea: 123,
  },
  scopenameb: {
    claimnameb: "test"
  },
};

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
    try {
      if (!req.body.id || !req.body.password) {
        throw new Error("Invalid body.");
      }
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

      const commitments = await credify.claims.push(id, claims);
      console.log(commitments);
      // TODO: store 'commitments' to DB

      res.send({ id });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  api.post("/user-counts", async (req, res) => {
    // TODO: query data provider's database to count the number of eligible users.

    const response = {
      data: {
        counts: [1000, 500]
      }
    };
    res.json(response);
  });

  api.post("/offer-evaluate", async (req, res) => {
    try {
      if (!req.body.credify_id || !req.body.conditions) {
        throw new Error("Invalid body");
      }

      const users = await db.User.findAll({ where: { credifyId: req.body.credify_id } });
      if (users.length !== 1) {
        throw new Error("Not found user properly");
      }
      const user = users[0];

      // TODO: compare the condition with this user's data.
      console.log(user);
      const level = 2;

      const response = {
        data: {
          level
        }
      };
      res.json(response);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  api.post("/encrypted-claims", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(" ")) {
      res.send("Unauthorized");
    }
    const accessToken = authHeader.split(" ")[1];
    const requestToken = req.body.requestToken;
    const approvalToken = req.body.approvalToken;
    try {
      const { publicKey, scopes } = await credify.claims.validateRequest(accessToken, requestToken, approvalToken);

      // TODO: construct claim object upon the granted scopes.
      const claims = {};

      const encrypted = await credify.claims.encrypt(claims, publicKey);
      res.send(encrypted);
    } catch (e) {
      res.send(e);
    }
  });

  return api;
};
