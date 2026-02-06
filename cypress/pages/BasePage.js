class BasePage {
  /**
   * Visit a specific path
   * @param {string} path - Path to visit (default: '/')
   */
  visit(path = '/') {
    cy.visit(path);
  }

  /**
   * Accept cookies if popup is visible
   */
  acceptCookies() {
    cy.log('🍪 Aceitando cookies...');
    cy.wait(2000);
    cy.get('#usercentrics-root') // Seleciona o elemento que carrega o shadow
    .shadow()                  // Entra no "túnel" do shadow DOM
    .find('[data-testid="uc-accept-all-button"]') // Procura o botão lá dentro
    .click();
    cy.wait(2000);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Custom timeout
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
  }

  /**
   * Click element with multiple selector strategies
   * @param {string[]} selectors - Array of selectors to try
   */
  clickElement(selectors) {
    cy.log(`🖱️ Tentando clicar com seletores: ${selectors.join(', ')}`);
    
    selectors.forEach((selector, index) => {
      cy.log(`📍 Tentando seletor ${index + 1}: ${selector}`);
      
      cy.get(selector).then($el => {
        if ($el.length > 0) {
          cy.log(`✅ Elemento encontrado com seletor: ${selector}`);
          cy.wrap($el).first().click();
          return true;
        } else {
          cy.log(`❌ Elemento não encontrado com seletor: ${selector}`);
        }
      });
    });
  }

  /**
   * Get text from element with multiple selector strategies
   * @param {string[]} selectors - Array of selectors to try
   */
  getText(selectors) {
    return cy.get(selectors.join(',')).first().invoke('text');
  }

  /**
   * Validate element contains text
   * @param {string[]} selectors - Array of selectors to try
   * @param {string|RegExp} text - Text to validate
   */
  validateContainsText(selectors, text) {
    cy.get(selectors.join(',')).first().should('contain.text', text);
  }
}

export default BasePage;
