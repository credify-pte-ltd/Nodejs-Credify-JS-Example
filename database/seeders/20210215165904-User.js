const faker = require("faker");
const { sha256 } = require("credify-nodejs");

const USER_COUNT = 5000;

const generateRandomVnPhoneNumber = () => {
  const vnPrefixes = ["37", "38", "39", "70", "76", "77", "78", "83", "81", "82", "85"];
  const randomPrefix = vnPrefixes[faker.random.number({
    'min': 0,
    'max': vnPrefixes.length - 1
  })];
  return randomPrefix + faker.phone.phoneNumber("#######");
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < USER_COUNT; i++) {
      const phoneNumber = generateRandomVnPhoneNumber();
      const data = {
        id: i + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber,
        phoneCountryCode: "+84",
        hashedPhoneNumber: sha256(`84${phoneNumber}`),
        creditScore: faker.random.number(500),
        socialScore: faker.random.number(300),
        transactionsCount: faker.random.number(1000),
        monthlyPaymentAmount: faker.random.number(1000000),
        credifyId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(data);
    }
    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
