const { faker } = require("@faker-js/faker");

const inputValues = {
  validInvestmentAmount: faker.datatype.number({ min: 1000, max: 1000000 }),
  maxInvestmentAmount: faker.datatype.number({ min: 55, max: 999 }),
  minInvestmentAmount: faker.datatype.number({ min: 1000001, max:9999999 }),
};

export default inputValues;
