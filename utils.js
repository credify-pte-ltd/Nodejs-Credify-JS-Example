const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const scopeNames = ["37c5abfa-a4b7-4521-a312-89a2ec53e804:credit-score", "37c5abfa-a4b7-4521-a312-89a2ec53e804:transactions"];
const scopesDefinition =
  [
    {
      "id":"3003a5da-7351-11eb-8347-a6b5174f10ec",
      "provider_id":"37c5abfa-a4b7-4521-a312-89a2ec53e804",
      "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:credit-score",
      "display_name":"Credit score",
      "description":"Credit score derived from user activity in this platform",
      "price":2,
      "is_onetime_charge":false,
      "is_active":true,
      "claims":[
        {
          "id":"3004c939-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"3003a5da-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:score",
          "display_name":"Credit score value",
          "description":"",
          "value_type":"Integer",
          "min_value":0,
          "max_value":500,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.009748Z",
          "updated_at":"2021-02-20T07:56:50.009749Z",
          "nested":null
        },
        {
          "id":"30060baa-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"3003a5da-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:fraud",
          "display_name":"Fraud or not",
          "description":"",
          "value_type":"Boolean",
          "min_value":null,
          "max_value":null,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.018005Z",
          "updated_at":"2021-02-20T07:56:50.018005Z",
          "nested":null
        },
        {
          "id":"30070f96-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"3003a5da-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:updated-at",
          "display_name":"Updated at",
          "description":"",
          "value_type":"Text",
          "min_value":null,
          "max_value":null,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.024668Z",
          "updated_at":"2021-02-20T07:56:50.024668Z",
          "nested":null
        }
      ],
      "created_at":"2021-02-20T07:56:50.002719Z",
      "updated_at":"2021-02-20T07:56:50.002719Z",
      "unit":"USD",
      "provider":null
    },
    {
      "id":"30081f6e-7351-11eb-8347-a6b5174f10ec",
      "provider_id":"37c5abfa-a4b7-4521-a312-89a2ec53e804",
      "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:transactions",
      "display_name":"Transaction data",
      "description":"User transation data",
      "price":3,
      "is_onetime_charge":false,
      "is_active":true,
      "claims":[
        {
          "id":"300955ab-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"30081f6e-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:total-count",
          "display_name":"Transaction count",
          "description":"",
          "value_type":"Integer",
          "min_value":0,
          "max_value":1000,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.039579Z",
          "updated_at":"2021-02-20T07:56:50.039579Z",
          "nested":null
        },
        {
          "id":"300a5f3b-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"30081f6e-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:monthly-payment-amount",
          "display_name":"Monthly payment amount",
          "description":"",
          "value_type":"Integer",
          "min_value":0,
          "max_value":1000000,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.046359Z",
          "updated_at":"2021-02-20T07:56:50.046359Z",
          "nested":null
        },
        {
          "id":"300b794b-7351-11eb-8347-a6b5174f10ec",
          "scope_id":"30081f6e-7351-11eb-8347-a6b5174f10ec",
          "main_claim_id":"",
          "scope":null,
          "name":"37c5abfa-a4b7-4521-a312-89a2ec53e804:currency",
          "display_name":"Currency",
          "description":"",
          "value_type":"Text",
          "min_value":null,
          "max_value":null,
          "is_active":false,
          "created_at":"2021-02-20T07:56:50.053583Z",
          "updated_at":"2021-02-20T07:56:50.053583Z",
          "nested":null
        }
      ],
      "created_at":"2021-02-20T07:56:50.031624Z",
      "updated_at":"2021-02-20T07:56:50.031624Z",
      "unit":"USD",
      "provider":null
    }
  ];

const composeClaimObject = (user, scopes) => {
  const claims = {};
  if (scopes.includes("37c5abfa-a4b7-4521-a312-89a2ec53e804:credit-score")) {
    claims["37c5abfa-a4b7-4521-a312-89a2ec53e804:credit-score"] = {
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:score": user.creditScore,
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:fraud": false,
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:updated-at": new Date().toISOString(),
    }
  }
  if (scopes.includes("37c5abfa-a4b7-4521-a312-89a2ec53e804:transactions")) {
    claims["37c5abfa-a4b7-4521-a312-89a2ec53e804:transactions"] = {
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:total-count": user.transactionsCount,
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:monthly-payment-amount": user.monthlyPaymentAmount,
      "37c5abfa-a4b7-4521-a312-89a2ec53e804:currency": "USD",
    }
  }
  return claims;
};

const lookUpScopeNameByClaimName = (claimName) => {
  let scopeName = ""
  scopesDefinition.forEach((s) => {
    if (scopeName) { return; }
    s.claims.forEach((c) => {
      if (c.name === claimName) {
        scopeName = s.name;
        return;
      }
    })
  });
  return scopeName;
}

/**
 *
 * @param condition
 * @param user
 * @param usingScopes Scope name list that user is going to share
 * @returns {{qualified: boolean, scopeName: string}}
 */
const checkValueCondition = (condition, user, usingScopes) => {
  const scopeName = lookUpScopeNameByClaimName(condition.claim.name);
  const userDeclined = !usingScopes.includes(scopeName);
  if (userDeclined) {
    return { qualified: false, scopeName };
  }

  if (condition.kind === "ContainCondition") {
    return { qualified: true, scopeName };
  }

  if (condition.kind === "InRangeCondition") {
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:score") {
      const qualified = user.creditScore >= Number(condition.value) && user.creditScore <= Number(condition.upper);
      return { qualified, scopeName };
    }
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:total-count") {
      const qualified = user.transactionsCount >= Number(condition.value) && user.transactionsCount <= Number(condition.upper);
      return { qualified, scopeName };
    }
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:monthly-payment-amount") {
      const qualified = user.monthlyPaymentAmount >= Number(condition.value) && user.monthlyPaymentAmount <= Number(condition.upper);
      return { qualified, scopeName };
    }
    return { qualified: false, scopeName };
  }

  if (condition.kind === "LargerThanCondition") {
    // No condition that falls into this.
    return { qualified: false, scopeName };
  }

  if (condition.kind === "LargerThanEqualCondition") {
    // No condition that falls into this.
    return { qualified: false, scopeName };
  }

  if (condition.kind === "EqualityCondition") {
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:fraud") {
      const qualified = !Boolean(condition.value);
      return { qualified, scopeName };
    }
  }
  return { qualified: false, scopeName };
};

const checkAndCondition = (subconditions, user, usingScopes) => {
  const scopeNames = [];
  const validConditions = subconditions.filter((c) => {
    const { qualified, scopeName } = checkValueCondition(c, user, usingScopes);
    if (qualified) { scopeNames.push(scopeName) }
    return qualified;
  });
  // All the sub conditions need to meet criterion.
  return { qualified: subconditions.length === validConditions.length, scopeNames: scopeNames.filter(onlyUnique) };
};

const checkOrCondition = (subconditions, user, usingScopes) => {
  const scopeNames = [];
  const validConditions = subconditions.filter((c) => {
    const { qualified, scopeName } = checkValueCondition(c, user, usingScopes);
    if (qualified) { scopeNames.push(scopeName) }
    return qualified;
  });
  // One of the sub conditions need to meet criterion.
  return { qualified: validConditions.length > 0, scopeNames: scopeNames.filter(onlyUnique) };
};

const checkNotCondition = (subconditions, user, usingScopes) => {
  if (subconditions.length !== 1) {
    return false;
  }
  const { qualified, scopeName } = checkValueCondition(subconditions[0], user, usingScopes);
  return { qualified: !qualified, scopeName };
};

const evaluateOffer = (user, conditions, usingScopes) => {
  let level = 0;
  let usedScopes = [];
  const requestedScopes = conditions.flatMap((c) => {
    if (c.subconditions) {
      return c.subconditions.flatMap((sb) => lookUpScopeNameByClaimName(sb.claim.name))
    } else {
      return lookUpScopeNameByClaimName(c.claim.name);
    }
  }).filter(onlyUnique);

  // Count from the back to find the best level.
  for (let i = conditions.length - 1; i >= 0; i--) {
    const condition = conditions[i];
    if (condition.kind === "AndCondition") {
      const res = checkAndCondition(condition.subconditions, user, usingScopes);
      if (res.qualified) {
        level = i + 1;
        usedScopes = res.scopeNames;
        break;
      }
    } else if (condition.kind === "OrCondition") {
      const res = checkOrCondition(condition.subconditions, user, usingScopes);
      if (res.qualified) {
        level = i + 1;
        usedScopes = res.scopeNames;
        break;
      }
    } else if (condition.kind === "NotCondition") {
      const res = checkNotCondition(condition.subconditions, user, usingScopes);
      if (res.qualified) {
        level = i + 1;
        usedScopes = [res.scopeName];
        break;
      }
    } else {
      const res = checkValueCondition(condition, user, usingScopes);
      if (res.qualified) {
        level = i + 1;
        usedScopes = [res.scopeName];
        break;
      }
    }
  }

  return { rank: level, usedScopes, requestedScopes };
};

const personalizeOffers = (user, offers) => {
  const list = [];
  offers.forEach((offer) => {
    // This uses all the scopes
    const result = evaluateOffer(user, offer.conditions, scopeNames);

    const formattedOffer = {
      ...offer,
      evaluation_result: {
        rank: result.rank,
        used_scopes: result.usedScopes,
        requested_scopes: result.requestedScopes,
      }
    };

    if (result.rank > 0) {
      // Return only qualified offers
      list.push(formattedOffer);
    }
  });
  return list;
};

module.exports = {
  personalizeOffers,
  evaluateOffer,
  scopeNames,
  composeClaimObject,
};
