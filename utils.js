export const scopeNames = ["37c5abfa-a4b7-4521-a312-89a2ec53e804:credit-score", "37c5abfa-a4b7-4521-a312-89a2ec53e804:transactions"];
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

export const composeClaimObject = (user, scopes) => {
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

/**
 *
 * @param condition
 * @param user
 * @returns {{qualified: boolean, scopeName: string}}
 */
const checkValueCondition = (condition, user) => {
  if (condition.kind === "ContainCondition") {
    return { qualified: true, scopeName: condition.claim.scope.name };
  }

  if (condition.kind === "InRangeCondition") {
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:score") {
      const qualified = user.creditScore >= Number(condition.value) && user.creditScore <= Number(condition.upper);
      return { qualified, scopeName: condition.claim.scope.name };
    }
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:total-count") {
      const qualified = user.transactionsCount >= Number(condition.value) && user.transactionsCount <= Number(condition.upper);
      return { qualified, scopeName: condition.claim.scope.name };
    }
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:monthly-payment-amount") {
      const qualified = user.monthlyPaymentAmount >= Number(condition.value) && user.monthlyPaymentAmount <= Number(condition.upper);
      return { qualified, scopeName: condition.claim.scope.name };
    }
    return { qualified: false, scopeName: condition.claim.scope.name };
  }

  if (condition.kind === "LargerThanCondition") {
    // No condition that falls into this.
    return { qualified: false, scopeName: condition.claim.scope.name };
  }

  if (condition.kind === "LargerThanEqualCondition") {
    // No condition that falls into this.
    return { qualified: false, scopeName: condition.claim.scope.name };
  }

  if (condition.kind === "EqualCondition") {
    if (condition.claim.name === "37c5abfa-a4b7-4521-a312-89a2ec53e804:fraud") {
      const qualified = !Boolean(condition.value);
      return { qualified, scopeName: condition.claim.scope.name };
    }
  }
  return { qualified: false, scopeName: condition.claim.scope.name };
};

const checkAndCondition = (subconditions, user) => {
  const scopeNames = [];
  const validConditions = subconditions.filter((c) => {
    const { qualified, scopeName } = checkValueCondition(c, user);
    if (qualified) { scopeNames.push(scopeName) }
    return qualified;
  });
  // All the sub conditions need to meet criterion.
  return { qualified: subconditions.length === validConditions.length, scopeNames };
};

const checkOrCondition = (subconditions, user) => {
  const scopeNames = [];
  const validConditions = subconditions.filter((c) => {
    const { qualified, scopeName } = checkValueCondition(c, user);
    if (qualified) { scopeNames.push(scopeName) }
    return qualified;
  });
  // One of the sub conditions need to meet criterion.
  return { qualified: validConditions.length > 0, scopeNames };
};

const checkNotCondition = (subconditions, user) => {
  if (subconditions.length !== 1) {
    return false;
  }
  const { qualified, scopeName } = checkValueCondition(subconditions[0], user);
  return { qualified: !qualified, scopeName };
};

export const personalizeOffers = (user, offers) => {
  const list = [];
  offers.forEach((offer) => {
    const levels = offer.conditions.length;
    let level = 0;
    let scopes = [];

    // Count from the back to find the best level.
    for (let i = levels - 1; i >= 0; i--) {
      const condition = offer.conditions[i];
      let qualified = false;
      let scopeNames = [];
      if (condition.kind === "AndCondition") {
        const res = checkAndCondition(condition.subconditions, user);
        if (res.qualified) {
          qualified = true;
          scopeNames = res.scopeNames;
        }
      } else if (condition.kind === "OrCondition") {
        const res = checkOrCondition(condition.subconditions, user);
        if (res.qualified) {
          qualified = true;
          scopeNames = res.scopeNames;
        }
      } else if (condition.kind === "NotCondition") {
        const res = checkNotCondition(condition.subconditions, user);
        if (res.qualified) {
          qualified = true;
          scopeNames = [res.scopeName];
        }
      } else {
        const res = checkValueCondition(condition, user);
        if (res.qualified) {
          qualified = true;
          scopeNames = [res.scopeName];
        }
      }
      if (qualified) {
        // +1 taking into consideration an index;
        level = i + 1;
        scopes = scopeNames;
        break;
      }
    }

    const formattedOffer = {
      ...offer,
      evaluation_result: {
        rank: level,
        used_scopes: scopes,
        required_scopes: offer.campaign.consumer.scopes,
      }
    };
    list.push(formattedOffer);
  });
  return list;
};
