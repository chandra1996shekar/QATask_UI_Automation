// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import selectors from '../fixtures/TestCafe-UI-Automation-Selectors.json'

Cypress.Commands.add('currentDateSelection', () => {
    const currentDate = new Date().getDate() ;
    cy.get(selectors.dateSelection).click();
    cy.get(selectors.daySelection)
      .contains(currentDate)
      .should('not.be.disabled')
      .click();
    
  });

  Cypress.Commands.add('switchToEmployeView',()=>
{
    cy.get(selectors.contextIcon).click()
        cy.get(selectors.employeeView).click()
        cy.wait(2000)
})

Cypress.Commands.add('validateTaskCreated',(taskName)=>
{

let matchFound = false; 

cy.get(selectors.taskAvailable).each(($el) => {
    const text = $el.text().trim();
    if (text === taskName) {
        matchFound = true;
        cy.wrap($el)
          .scrollIntoView() 
          .should('be.visible');
    }
}).then(() => {
    expect(matchFound).to.be.true; // Assert at one exact match was found
});
;
})


