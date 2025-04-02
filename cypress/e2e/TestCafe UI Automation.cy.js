/// <reference types="cypress" />

import selectors from "../fixtures/TestCafe-UI-Automation-Selectors.json";
import testdata from "../fixtures/TestCafe-UI-Automation-TestData.json";
import { reusableMethods } from "../pageObjects/reusableMethods";

describe("TestCAfe UI Automation", () => {
  beforeEach(() => {
    //Test-1: login Test

    cy.visit(selectors.url);
    cy.get(selectors.userName).type(testdata.username);
    cy.get(selectors.password).type(testdata.password);
    cy.get(selectors.login).eq(1).click();

    // Assertions after login
    cy.url().should("contain", testdata.dashBoardUrl);
    cy.get(selectors.loggedInUser).should(
      "have.text",
      testdata.loggedInUserName
    );
  });

  it("Test-2: Switch to Employee View", () => {
    cy.switchToEmployeView();
    //assertions after Switch to Employee View redirect url and Task button is enabled and available
    cy.url().should("contain", testdata.employeeViewUrl);
    cy.get(selectors.addtask)
      .should("be.enabled")
      .and("have.text", testdata.taskButtonText);
  });

  it("Test-3: Form Validation", () => {
    cy.switchToEmployeView();
    reusableMethods.clickOnTaskButton(selectors.addtask);
    cy.get(selectors.submitButton).should("be.enabled").click();
    // validate submit button is disabled
    cy.get(selectors.submitButton).should("not.be.enabled");
    //validate all the form validation messages
    cy.get(selectors.fieldValiadtors)
      .not(`:contains("${testdata.validateMessage}")`)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .and("contain", testdata.validationMessages);
      });
    cy.contains(testdata.validateMessage).should("be.visible");
  });

  it("Test-4: Task Creation", () => {
     cy.switchToEmployeView();
     
        reusableMethods.clickOnTaskButton(selectors.addtask)
       reusableMethods.selectDropdownOption(selectors.superCategory,testdata.superCatergory)
       reusableMethods.selectDropdownOption(selectors.subCategory,testdata.subCategory,testdata.subCategory)
      cy.get(selectors.taskName).type(testdata.taskName)
      reusableMethods.selectDropdownOption(selectors.assignedTo,testdata.assigne)
      reusableMethods.selectDropdownOption(selectors.reviewer,testdata.reviewer)
      reusableMethods.selectDropdownOption(selectors.prority,testdata.priorityLevel)
      cy.currentDateSelection()
      cy.get(selectors.description).type(testdata.description)
     cy.get(selectors.submitButton).click()
     cy.intercept('POST',selectors.taskCreateAPI).as('createTask')
     cy.contains(selectors.createTaskConfirmation).click()
     cy.wait('@createTask')
    cy.validateTaskCreated(testdata.taskName);
  });

  it("Test-5: Negative Test Case:Test Invalid or Missing Information:", () => {
    cy.switchToEmployeView();
    reusableMethods.clickOnTaskButton(selectors.addtask);
    reusableMethods.selectDropdownOption(
      selectors.superCategory,
      testdata.superCatergory
    );
    reusableMethods.selectDropdownOption(
      selectors.subCategory,
      testdata.subCategory,
      testdata.subCategory
    );
    cy.get(selectors.taskName).type(testdata.taskName);
    reusableMethods.selectDropdownOption(
      selectors.assignedTo,
      testdata.assigne
    );
    reusableMethods.selectDropdownOption(selectors.reviewer, testdata.reviewer);
    reusableMethods.selectDropdownOption(
      selectors.prority,
      testdata.priorityLevel
    );
    cy.currentDateSelection();
    //Not proving the description and try to submit task
    cy.get(selectors.submitButton).should("not.be.enabled");
  });
});
