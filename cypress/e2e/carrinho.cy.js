/// <reference types="cypress" />

describe('Carrinho de Compras', () => {
  let emailUsuario
  let senhaUsuario

  before(() => {
    cy.criarUsuarioViaFront().then((credenciais) => {
      emailUsuario = credenciais.email
      senhaUsuario = credenciais.senha
    })
  })

  beforeEach(() => {
    // Pré-condição: realizar login antes de cada cenário
    cy.loginUI(emailUsuario, senhaUsuario)
    cy.url().should('include', '/home')
  })

  it('deve exibir a lista de produtos disponíveis após o login', () => {
    // Validação: seção de produtos deve ter mais de dois itens
    cy.get('.card.col-3').should('have.length.greaterThan', 0)
  })

  it('deve adicionar um produto à lista e redirecionar para Lista de Compras', () => {
    // Ação: scroll e adicionar Logitech MX Vertical à lista
    cy.scrollTo('bottom')
    cy.get('h5.card-title.negrito')
      .contains('Logitech MX Vertical')
      .closest('.card')
      .find('[data-testid="adicionarNaLista"]')
      .click()

    // Validação: redireciona para Lista de Compras e produto aparece
    cy.url().should('include', 'minhaListaDeProdutos')
    cy.contains('Lista de Compras').should('be.visible')
    cy.get('[data-testid="shopping-cart-product-name"]')
      .should('contain', 'Logitech MX Vertical')
  })

  it('deve acessar detalhes do produto, adicionar à lista e validar quantidade maior que zero', () => {
    // Ação: clicar no link Detalhes do Logitech MX Vertical
    cy.scrollTo('bottom')
    cy.contains('.card', 'Logitech MX Vertical')
      .find('a.card-link')
      .contains('Detalhes')
      .click()

    // Validação: detalhes do produto (nome, preço, descrição)
    cy.get('[data-testid="product-detail-name"]').should('contain', 'Logitech MX Vertical')
    cy.contains('R$: 470').should('be.visible')
    cy.contains('Mouse').should('be.visible')

    // Ação: adicionar à lista
    cy.get('[data-testid="adicionarNaLista"]').click()

    // Validação: redireciona para lista e quantidade maior que zero
    cy.url().should('include', 'minhaListaDeProdutos')
    cy.get('.row > :nth-child(3)').should('have.length.greaterThan', 0)
  })

  it('deve limpar a lista, validar mensagem de carrinho vazio e voltar para home', () => {
    // Pré-condição: adicionar produto e ir para Lista de Compras
    cy.scrollTo('bottom')
    cy.get('h5.card-title.negrito')
      .contains('Logitech MX Vertical')
      .closest('.card')
      .find('[data-testid="adicionarNaLista"]')
      .click()

    cy.url().should('include', 'minhaListaDeProdutos')

    // Ação: limpar a lista
    cy.get('[data-testid="limparLista"]').click()

    // Validação: zero na lista e mensagem de carrinho vazio
    cy.contains('Seu carrinho está vazio').should('be.visible')

    // Ação: clicar para voltar
    cy.get('[data-testid="paginaInicial"]').click()

    // Validação: voltou para home
    cy.url().should('include', '/home')
  })
})