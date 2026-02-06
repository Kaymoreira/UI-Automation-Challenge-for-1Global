import BasePage from './BasePage';

class PlansPage extends BasePage {
  // Seletores para cards de planos
  get planCardSelectors() {
    return [
      '.plan-card',                          // Card específico
      '.plan-item',                          // Item de plano
      '.package-card',                        // Package card
      '[data-testid*="plan"]',              // Test ID parcial
      '.pricing-card',                        // Pricing card
      '.product-card',                        // Product card
      '[data-plan]',                          // Data attribute
      '.deal-card',                          // Deal card
      '.offer-card'                          // Offer card
    ];
  }

  // Seletores para preços
  get priceSelectors() {
    return [
      '.price',                              // Classe price
      '.plan-price',                          // Plan price
      '[data-testid="price"]',               // Test ID
      '.pricing',                            // Pricing
      '.cost',                               // Cost
      '.amount',                             // Amount
      '[data-price]',                         // Data price
      '.value'                               // Value
    ];
  }

  /**
   * Wait for plans to load
   */
  waitForPlansToLoad() {
    cy.log('⏳ Pulando verificação de planos temporariamente...');
    // TODO: Implementar verificação de planos quando seletores corretos forem fornecidos
    cy.wait(2000);
    cy.log('✅ Verificação de planos pulada');
  }

  /**
   * Get plan card at specific index
   * @param {number} index - Plan index (0-based)
   */
  getPlanCard(index) {
    cy.log(`📋 Buscando plano ${index + 1} (índice ${index})`);
    
    // CSS selector para cards
    return cy.get('[class*="plan"], [class*="card"], [class*="package"]').eq(index);
  }

  /**
   * Validate plan details
   * @param {number} planIndex - Plan index (0-based)
   * @param {Object} expectedDetails - Expected plan details
   */
  validatePlanDetails(planIndex, expectedDetails) {
    cy.log(`🔍 Validando detalhes do plano ${planIndex + 1}`);
    
    this.getPlanCard(planIndex).within(() => {
      Object.entries(expectedDetails).forEach(([key, value]) => {
        cy.log(`📝 Validando campo: ${key}`);
        
        switch (key) {
          case 'country':
            cy.contains(new RegExp(value, 'i')).should('be.visible');
            cy.log(`✅ País validado: ${value}`);
            break;
          case 'data':
            cy.contains(new RegExp(value, 'i')).should('be.visible');
            cy.log(`✅ Dados validados: ${value}`);
            break;
          case 'validity':
            cy.contains(new RegExp(value, 'i')).should('be.visible');
            cy.log(`✅ Validade validada: ${value}`);
            break;
          case 'planType':
            cy.contains(new RegExp(value, 'i')).should('be.visible');
            cy.log(`✅ Tipo de plano validado: ${value}`);
            break;
          case 'price':
            this.validatePrice(value);
            break;
          default:
            cy.log(`⚠️ Chave desconhecida: ${key}`);
        }
      });
    });
    
    cy.log(`✅ Plano ${planIndex + 1} validado com sucesso`);
  }

  /**
   * Validate price format
   * @param {RegExp} expectedPricePattern - Expected price pattern
   */
  validatePrice(expectedPricePattern) {
    cy.log('💰 Validando preço...');
    
    // CSS selector para preços
    cy.log('🎯 Tentando CSS selector para preço...');
    cy.get('[class*="price"], [class*="cost"], [data-testid*="price"]')
      .invoke('text')
      .then((priceText) => {
        const price = priceText.trim();
        cy.log(`💰 Preço encontrado: ${price}`);
        expect(price).to.match(expectedPricePattern);
        cy.log(`✅ Preço validado: ${price}`);
      });
  }

  /**
   * Get plan price
   * @param {number} planIndex - Plan index (0-based)
   */
  getPlanPrice(planIndex) {
    cy.log(`💰 Obtendo preço do plano ${planIndex + 1}`);
    
    return this.getPlanCard(planIndex)
      .find('[class*="price"], [class*="cost"], [data-testid*="price"]')
      .first()
      .invoke('text')
      .then((priceText) => {
        const price = priceText.trim();
        cy.log(`💰 Preço capturado: ${price}`);
        return price;
      });
  }

  /**
   * Get all available plans
   */
  getAllPlans() {
    return cy.get('[class*="plan"], [class*="card"], [class*="package"]');
  }

  /**
   * Get number of available plans
   */
  getPlansCount() {
    cy.log('📊 Contando planos disponíveis...');
    
    return this.getAllPlans()
      .its('length')
      .then((count) => {
        cy.log(`📊 Total de planos: ${count}`);
        return count;
      });
  }
}

export default PlansPage;
