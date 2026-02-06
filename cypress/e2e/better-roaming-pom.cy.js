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
    
    cy.log('✅ Setup concluído com sucesso - teste parando após aceitar cookies');
  });

  it('Teste simples - apenas aceitar cookies', () => {
    cy.log('🎉 Teste concluído - apenas aceitamos os cookies');
    // TODO: Próximos passos serão implementados conforme mapeamento do usuário
  });
});
