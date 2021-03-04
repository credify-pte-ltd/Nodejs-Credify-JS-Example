const dataProviderConfig = {
  id: "f70ba67a-f70a-4f1a-b30c-b7c94da18ce2",
  signingPrivateKey: `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIIFAGP2cc2Ld9vOnfKv7LZLRDihXq6c4NB/5zCWzT4u7
  -----END PRIVATE KEY-----`,
  apiKey: "8rsHuj7ZVo1HAZrxBqe7G1nQrq4c8orszhwYOK9bG79dfXJWpFqiHgzJvqkg5QB5",
  email: "Taya23@hotmail.com",
  password: "Ifkhprwzof33@",
};
const dataReceiverConfig = {
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

module.exports = {
  dataProviderConfig,
  dataReceiverConfig,
};
