const { faker } = require("@faker-js/faker");

export function inputValues() {
  const validInvestmentAmount = faker.number.int({ min: 1000, max: 1000000 });
  const maxInvestmentAmount = faker.number.int({ min: 1, max: 999 });
  const minInvestmentAmount = faker.number.int({ min: 1000001, max: 9999999 });
  return { validInvestmentAmount, maxInvestmentAmount, minInvestmentAmount };
}
