// Objeto que mapeia e centraliza os seletores CSS da página de cadastro
const seletores = {
  // Campos da tela inicial de Signup
  nomeCadastro: '[data-qa="signup-name"]',
  emailCadastro: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',

  // Campos do formulário de cadastro completo
  generoMasculino: '#id_gender1',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  zipcode: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  // Elementos da tela final de confirmação de conta criada
  mensagemContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

// Objeto 'cadastro' exportado para conter todas as ações do fluxo de registro
export const cadastro = {

  // Preenche o nome e o e-mail na primeira etapa e clica no botão Signup
  iniciarCadastro(nome, email) {
    cy.get(seletores.nomeCadastro).type(nome);
    cy.get(seletores.emailCadastro).type(email);
    cy.get(seletores.botaoSignup).click();
  },

  // Preenche todos os campos obrigatórios do formulário extenso de cadastro
  preencherFormularioCompleto(dados) {
    cy.get(seletores.generoMasculino).check();         // Seleciona a opção de gênero
    cy.get(seletores.senha).type(dados.senha);         // Digita a senha informada
    cy.get(seletores.diaNascimento).select(dados.dia); // Seleciona o dia no menu suspenso
    cy.get(seletores.mesNascimento).select(dados.mes); // Seleciona o mês no menu suspenso
    cy.get(seletores.anoNascimento).select(dados.ano); // Seleciona o ano no menu suspenso
    cy.get(seletores.primeiroNome).type(dados.nome);   // Digita o primeiro nome
    cy.get(seletores.sobrenome).type(dados.sobrenome); // Digita o sobrenome
    cy.get(seletores.endereco).type(dados.endereco);   // Digita o endereço de entrega
    cy.get(seletores.pais).select(dados.pais);         // Seleciona o país
    cy.get(seletores.estado).type(dados.estado);       // Digita o estado
    cy.get(seletores.cidade).type(dados.cidade);       // Digita a cidade
    cy.get(seletores.zipcode).type(dados.zipcode);     // Digita o código postal
    cy.get(seletores.celular).type(dados.celular);     // Digita o número de celular
    cy.get(seletores.botaoCriarConta).click();         // Clica no botão para finalizar o cadastro
  },

  // Valida a mensagem de conta criada e clica em Continuar
  validarContaCriada() {
    cy.get(seletores.mensagemContaCriada)
      .should('be.visible')
      .and('contains.text', 'Account Created'); // Garante validação insensível a maiúsculas/minúsculas
    cy.get(seletores.botaoContinuar).click();   // Clica no botão 'Continue' para prosseguir
  }
};
