# ServeRest Frontend — Testes E2E Automatizados com Cypress

Suíte de testes end-to-end para o frontend [ServeRest](https://front.serverest.dev/), cobrindo os fluxos de **Login**, **Cadastro de Usuário** e **Carrinho de Compras**.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|--------------|
| Node.js    | 18.x         |
| npm        | 9.x          |

---

## Instalação

```bash
# Clone o repositório
git clone 
cd moutsfront/cypress

# Instale as dependências
npm install
```

---

## Como executar

### Modo headless (CI / terminal)
```bash
npx cypress run
```

### Modo interativo (Cypress App)
```bash
npx cypress open
```

> A `baseUrl` já está configurada para `https://front.serverest.dev` — nenhuma variável de ambiente extra é necessária.

---

## Estrutura do projeto

```
cypress/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js      # Cenários de autenticação via UI
│   │   ├── cadastro.cy.js   # Cenários de cadastro de usuário
│   │   └── carrinho.cy.js   # Fluxo completo do carrinho de compras
│   ├── fixtures/
│   │   └── dados.json       # Credenciais do usuário admin pré-cadastrado
│   └── support/
│       ├── commands.js      # Comandos customizados reutilizáveis
│       └── e2e.js           # Importação global dos commands
└── cypress.config.js        # Configuração global (baseUrl, etc.)
```

---

## Cenários de teste

### `login.cy.js` — Autenticação
| # | Cenário |
|---|---------|
| 1 | Deve realizar login com credenciais válidas e redirecionar para a home |
| 2 | Deve exibir mensagem de erro ao tentar login com senha incorreta |
| 3 | Deve exibir mensagem de erro ao tentar login com campos em branco |
| 4 | Deve redirecionar para página de cadastro ao clicar em "Cadastre-se" |
| 5 | Deve exibir erro de validação ao tentar login com e-mail inválido |

### `cadastro.cy.js` — Cadastro de Usuário
| # | Cenário |
|---|---------|
| 1 | Deve cadastrar um novo usuário comum com sucesso e redirecionar para home |
| 2 | Deve exibir mensagem de erro ao cadastrar com e-mail já existente |
| 3 | Deve cadastrar um administrador e redirecionar para a home de admin |

### `carrinho.cy.js` — Carrinho de Compras
| # | Cenário |
|---|---------|
| 1 | Deve exibir a lista de produtos disponíveis após o login |
| 2 | Deve adicionar um produto à lista e redirecionar para Lista de Compras |
| 3 | Deve acessar detalhes do produto, adicionar à lista e validar quantidade maior que zero |
| 4 | Deve limpar a lista, validar mensagem de carrinho vazio e voltar para home |

---

## Comandos customizados

Definidos em `cypress/support/commands.js` e disponíveis em todos os testes:

| Comando | Descrição |
|---------|-----------|
| `cy.criarUsuarioViaFront()` | Cria um novo usuário navegando pelo formulário de cadastro e retorna `{ email, senha }` |
| `cy.loginUI(email, senha)` | Realiza login completo via interface (visit + fill + submit) |

---

## Fixtures

| Arquivo | Conteúdo |
|---------|----------|
| `dados.json` | Credenciais do usuário admin pré-cadastrado (`fulano@qa.com`) usado nos testes de login |

> Usuários criados dinamicamente pelos testes usam e-mails com `Date.now()` para garantir unicidade a cada execução.

---

## Boas práticas adotadas

- **Seletores estáveis**: todos os elementos são acessados via `data-testid`, evitando dependência de classes CSS ou posição no DOM.
- **Isolamento de testes**: cada `describe` cria e gerencia seus próprios dados de usuário via `before/beforeEach`.
- **Sem waits fixos**: navegação e estados assíncronos são tratados com asserções que aguardam o elemento (`should`).
- **Comandos reutilizáveis**: fluxos de login e cadastro estão encapsulados em custom commands, eliminando duplicação.
- **Assertivas descritivas**: cada validação aponta exatamente o que se espera ver na tela (URL, mensagem, elemento visível).
- **Dados dinâmicos**: e-mails são gerados com timestamp, garantindo independência entre execuções consecutivas.
