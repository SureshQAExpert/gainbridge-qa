import * as productDetails from "../fixtures/productPage.json";
import * as inputData from "../utilities/inputData";

const [threeYrsRate, fourYrsRate, fiveYrsRate] = Object.values(
  productDetails.investmentRates
);
const labelHeadings = Object.values(productDetails.headings);
const amount = inputData.inputValues();
let durationValue;

describe("GainBridge Application", () => {
  beforeEach("login", () => {
    cy.task("clearDirectory", "cypress/results/");
    cy.visit(Cypress.config("baseUrl"));
  });

  it("verification of product selection page elements", () => {
    cy.verifyHeading(productDetails.mainHeading);
    cy.verifyParagraph(productDetails.paragraph);
    cy.verifyBackButtonIsDisplayed();
    for (let heading of labelHeadings) {
      cy.verifyLabelHeading(heading);
    }
    cy.verifyInvestmentAmountInputElement();
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyButtonElement();
  });

  it("validating the projected account with default value", () => {
    cy.enterInvestmentAmount(amount.validInvestmentAmount);
    cy.slideLabelValue();
    cy.addDurationAndVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      amount.validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });
  });

  it("validating the projected account value with investment amount less than 1000", () => {
    cy.enterInvestmentAmount(amount.minInvestmentAmount);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });

  it("validating the projected account value with investment amount greater than 1000000", () => {
    cy.enterInvestmentAmount(amount.maxInvestmentAmount);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });

  it("validating the projected account value with time duration 10 years", () => {
    cy.enterInvestmentAmount(amount.validInvestmentAmount);
    cy.slider();
    cy.slideLabelValue();
    cy.addDurationAndVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      amount.validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });
  });

  it("validating the projected account value with duration 5 years", () => {
    cy.enterInvestmentAmount(amount.validInvestmentAmount);
    cy.setSliderValue(productDetails.sliderValue);
    cy.slideLabelValue();
    cy.addDurationAndVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      amount.validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });
  });

  it("validating the projected account value with investment amount of 999", () => {
    cy.enterInvestmentAmount(productDetails.investmentAmount999);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });

  it("validating the projected account value with an investment amount of 1,000,001", () => {
    cy.enterInvestmentAmount(productDetails.investmentAmount1000001);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });
});
