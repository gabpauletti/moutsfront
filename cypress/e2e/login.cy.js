/// <reference types="cypress" />

describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login')
    })
  
    it('deve realizar login com credenciais válidas e redirecionar para a home', () => {
      // Pré-condição: usuário pré-cadastrado na plataforma (fulano@qa.com / teste)
      cy.fixture('dados').then(({ usuarioAdmin }) => {
        cy.get('[data-testid="email"]').type(usuarioAdmin.email)
        cy.get('[data-testid="senha"]').type(usuarioAdmin.senha)
        cy.get('[data-testid="entrar"]').click()
  
        // Validação: redirecionamento para a lista de produtos (admin)
        cy.url().should('include', '/admin/home')
        cy.contains('Bem Vindo').should('be.visible')
      })
    })
  
    it('deve exibir mensagem de erro ao tentar login com senha incorreta', () => {
      cy.get('[data-testid="email"]').type('fulano@qa.com')
      cy.get('[data-testid="senha"]').type('senhaErrada123')
      cy.get('[data-testid="entrar"]').click()
  
      // Validação: permanecer na tela de login e exibir alerta de erro
      cy.url().should('include', '/login')
      cy.contains('Email e/ou senha inválidos').should('be.visible')

    })
  
    it('deve exibir mensagem de erro ao tentar login com campos em branco', () => {
      cy.get('[data-testid="entrar"]').click()
  
      // Validação: mensagens de validação dos campos obrigatórios
      cy.contains('Password é obrigatório').should('be.visible')
      cy.contains('Email é obrigatório').should('be.visible')
    })

    it('deve redirecionar para página de cadastro ao clicar em Cadastro', () => {
      cy.contains('Cadastre-se').click()

      cy.url().should('include', '/cadastrarusuarios')
    })

    it('deve exibir mensagem de erro ao tentar login com email inválido', () => {
      cy.get('[data-testid="email"]').type('emailinvalido')
      cy.get('[data-testid="senha"]').type('teste1234')
      cy.get('[data-testid="entrar"]').click()

      // Validação: mensagem nativa do browser (tooltip) - validationMessage não está no DOM
      cy.get('[data-testid="email"]').then(($input) => {
        expect($input[0].validationMessage).to.include('@')
      })
    })
  })
  