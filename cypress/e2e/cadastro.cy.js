describe('Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios')
  })

  it('deve cadastrar um novo usuário comum com sucesso e redirecionar para login', () => {
    const emailUnico = `gabriel_${Date.now()}@teste.com`

    cy.get('[data-testid="nome"]').type('Gabriel')
    cy.get('[data-testid="email"]').type(emailUnico)
    cy.get('[data-testid="password"]').type('teste1234')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('include', '/home')
  })

  it('deve exibir mensagem de erro ao tentar cadastrar com email já existente', () => {
    cy.get('[data-testid="nome"]').type('Nome Qualquer')
    cy.get('[data-testid="email"]').type('fulano@qa.com')
    cy.get('[data-testid="password"]').type('teste')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Este email já está sendo usado').should('be.visible')
    
  })

  it('deve cadastrar um administrador e redirecionar para a home de admin', () => {
    const emailAdmin = `admin_${Date.now()}@teste.com`

    cy.get('[data-testid="nome"]').type('Admin Cypress')
    cy.get('[data-testid="email"]').type(emailAdmin)
    cy.get('[data-testid="password"]').type('teste1234')
    cy.get('[id="administrador"]').check()
    cy.get('[data-testid="cadastrar"]').click()
    cy.url().should('include', '/home')
  })
})
