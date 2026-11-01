// Objeto que centraliza os seletores CSS da tela de Login e ações de sessão
const seletores = {
  // Formulário de Login
  emailLogin: '[data-qa="login-email"]',
  senhaLogin: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: '.login-form form p',

  // Elementos do cabeçalho superior quando o usuário está autenticado
  usuarioLogado: 'a:contains("Logged in as")',
  botaoLogout: 'a[href="/logout"]',
  botaoExcluirConta: 'a[href="/delete_account"]',

  // Tela de confirmação de exclusão da conta
  mensagemContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuarExclusao: '[data-qa="continue-button"]'
};

// Objeto 'login' exportado com todas as funções de autenticação e gestão de conta
export const login = {

  // Preenche o formulário de login com e-mail e senha e clica no botão de Login
  preencherLogin(email, senha) {
    cy.get(seletores.emailLogin).type(email);
    cy.get(seletores.senhaLogin).type(senha);
    cy.get(seletores.botaoLogin).click();
  },

  // Valida se o nome do usuário logado aparece exibido corretamente no cabeçalho
  validarUsuarioLogado(nomeUsuario) {
    cy.get(seletores.usuarioLogado)
      .should('be.visible')
      .and('contain', nomeUsuario);
  },

  // Valida a mensagem de erro esperada ao tentar logar com credenciais inválidas
  validarMensagemErroLogin(mensagemEsperada) {
    cy.get(seletores.mensagemErro)
      .should('be.visible')
      .and('contain', mensagemEsperada);
  },

  // Realiza o logout clicando no link correspondente no cabeçalho
  efetuarLogout() {
    cy.get(seletores.botaoLogout).click();
  },

  // Efetua a exclusão da conta e confirma a exibição do alerta de remoção
  excluirConta() {
    cy.get(seletores.botaoExcluirConta).click(); // Clica no link 'Delete Account'
    cy.get(seletores.mensagemContaExcluida)
      .should('be.visible')
      .and('contains.text', 'Account Deleted'); // Valida a confirmação de exclusão no HTML
    cy.get(seletores.botaoContinuarExclusao).click(); // Clica em 'Continue' após apagar
  }
};
