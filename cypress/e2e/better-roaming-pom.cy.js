import HomePage from '../pages/HomePage';

describe('Better Roaming - Page Object Model', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.log('🚀 Iniciando setup do teste...');
    
    // Ignorar erros uncaught da aplicação
    Cypress.on('uncaught:exception', () => false);
    
    // Navegar para página inicial
    homePage.navigate();
    
    // Aceitar cookies
    homePage.acceptCookies();
    
    // Verificar que página carregou
    homePage.isPageLoaded();
    
    cy.log('✅ Setup concluído com sucesso');
  });

    it('Teste completo - clicar na moeda e abrir modal', () => {
    // 1. Garante que o documento está totalmente carregado
    cy.document().its('readyState').should('eq', 'complete');
    
    cy.get('body').then(($body) => {
        // Selecionamos a div pai que você marcou com a seta vermelha
        // Ela tem a classe cursor-pointer e o texto USD
        const btnMoeda = $body.find('div.cursor-pointer:contains("USD"):visible');

        if (btnMoeda.length > 0) {
            cy.log('Modo Desktop detectado');
            
            cy.contains('div.cursor-pointer', 'USD', { timeout: 10000, includeShadowDom: true })
                .filter(':visible')
                .first()
                .scrollIntoView()
                .click();
        } else {
            cy.log('Modo Mobile detectado');
            cy.get('img[src*="menu"]').first().click();
            cy.contains('div', 'USD', { timeout: 10000, includeShadowDom: true })
              .filter(':visible')
              .first()
              .scrollIntoView()
              .click({ force: true });
        }
    });

    // 2. A VALIDAÇÃO QUE NÃO DEIXA O TESTE MENTIR
    // Olhando sua imagem de sucesso, o modal tem o texto "Search Currency"
    cy.log('⌛ Aguardando modal abrir de verdade...');
    cy.contains('div', 'Search Currency', { timeout: 10000 })
        .should('be.visible');

    cy.get('input[placeholder*="Currency"]')
        .should('be.visible')
        .type('Euro');
  });
});
