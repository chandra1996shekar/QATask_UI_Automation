import selectors from '../fixtures/TestCafe-UI-Automation-Selectors.json'
export class reusableMethods {

    static selectDropdownOption(dropdownSelector, optionText) {
        cy.get(dropdownSelector).click()
        cy.get("ul[role='listbox'] li").contains(optionText).click()
      
    }

    static clickOnTaskButton(selector){
        cy.get(selector).click({force:true})
    }
}


    
