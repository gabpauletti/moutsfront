// ***********************************************
// Custom Cypress commands
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('criarUsuarioViaFront', () => {
  const email = `pedro_${Date.now()}@teste.com`
  const senha = 'teste1234'

  cy.visit('/cadastrarusuarios')
  cy.get('[data-testid="nome"]').type('Pedro')
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="password"]').type(senha)
  cy.get('[data-testid="cadastrar"]').click()
  cy.contains('Cadastro realizado com sucesso').should('be.visible')
  cy.url().should('include', '/home')

  return cy.wrap({ email, senha })
})

/**
 * Realiza login via UI
 * @param {string} email
 * @param {string} senha
 */
Cypress.Commands.add('loginUI', (email, senha) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="senha"]').type(senha)
  cy.get('[data-testid="entrar"]').click()
})
