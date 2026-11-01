/// <reference types="cypress" />

// Importação dos 5 módulos com os seletores e funções de interação encapsuladas
import { cadastro } from '../modules/cadastro/cadastro_index';
import { login } from '../modules/login/login_index';
import { produtos } from '../modules/produtos/produtos_index';
import { carrinho } from '../modules/carrinho/carrinho_index';
import { rodape } from '../modules/rodape/rodape_index';

describe('Trabalho de Conclusão - Automação Web', () => {

  beforeEach(() => {
    cy.visit('/');
  });

// =========================================================================
// Módulo de Cadastro e Login (Casos 1 a 7)
// =========================================================================

  it('Caso 1: Cadastrar usuário com sucesso e excluir conta', () => {
    
    const emailDinamico = `user_web_${Date.now()}@teste.com`;
 
    cy.get('a[href="/login"]').click();

    // Preenche o nome e o e-mail dinâmico no formulário inicial de cadastro e clica no botão "Signup"
    cadastro.iniciarCadastro('Marcela Castro', emailDinamico);

    // Preenche todos os campos obrigatórios do formulário de cadastro
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8',
      mes: 'May',
      ano: '1995',
      nome: 'Marcela',
      sobrenome: 'Castro',
      endereco: 'Rua Web, 897',
      pais: 'India',
      estado: 'Alagoas',
      cidade: 'Maceió',
      zipcode: '90001',
      celular: '11999999999'
    });

    // Valida o texto "Account Created!" e clica no botão Continuar
    cadastro.validarContaCriada();

    // Clica no link de exclusão de conta
    login.excluirConta();
  });

  it('Caso 2: Login de usuário com e-mail e senha corretos', () => {
    const emailDinamico = `user_web_${Date.now()}@teste.com`;

    // PRÉ-REQUISITO: Cadastra o usuário para garantir que a conta existe
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Marcela Login', emailDinamico);
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8', mes: 'May', ano: '1995',
      nome: 'Marcela', sobrenome: 'Login',
      endereco: 'Av Testes, 200', pais: 'India',
      estado: 'Alagoas', cidade: 'Maceió',
      zipcode: '90001', celular: '11999999999'
    });
    cadastro.validarContaCriada();

    // Logout para permitir o teste do fluxo de Login
    login.efetuarLogout();

    // Execução do teste de login: Abre a tela de login e digita as credenciais válidas
    cy.get('a[href="/login"]').click();
    login.preencherLogin(emailDinamico, 'WebAutomacao123');

    // Valida se o texto está visível no cabeçalho 
    login.validarUsuarioLogado('Marcela Login');

    // Apaga a conta após o teste para manter o banco limpo
    login.excluirConta();
  });

  it('Caso 3: Tentar login com e-mail e senha inválidos', () => {

    cy.get('a[href="/login"]').click();

    // Tenta autenticar utilizando e-mail e senha incorretos
    login.preencherLogin('email_invalido@web.com', 'SenhaInvalida123');

    // Valida se a mensagem de erro é exibida corretamente na tela de login
    login.validarMensagemErroLogin('Your email or password is incorrect!');
  });

  it('Caso 4: Logout de usuário com sucesso', () => {
    const emailDinamico = `user_logout_${Date.now()}@teste.com`;

    // PRÉ-REQUISITO: Cadastra o usuário para garantir que a conta existe
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Marcela Logout', emailDinamico);
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8', mes: 'May', ano: '1995',
      nome: 'Marcela', sobrenome: 'Logout',
      endereco: 'Rua Logout, 300', pais: 'India',
      estado: 'Alagoas', cidade: 'Maceió',
      zipcode: '90001', celular: '11999999999'
    });
    cadastro.validarContaCriada();

    // Clica no link 'Logout' localizado no cabeçalho superior
    login.efetuarLogout();

    // Valida se a URL do navegador mudou e agora inclui a rota '/login'
    cy.url().should('include', '/login');
  });

  it('Caso 5: Tentar cadastrar usuário com e-mail já existente', () => {

    const userExistente = `user_existente_${Date.now()}@teste.com`;

    // 1. Cadastra o usuário para garantir a existência do e-mail no sistema e faz logout em seguida
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Usuario Existente', userExistente);
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8', mes: 'May', ano: '1995',
      nome: 'Usuario', sobrenome: 'Existente',
      endereco: 'Rua Teste, 1', pais: 'India',
      estado: 'Alagoas', cidade: 'Maceió',
      zipcode: '90001', celular: '11999999999'
    });
    cadastro.validarContaCriada();
    login.efetuarLogout();

    // 2. Tenta iniciar o cadastro novamente com o mesmo e-mail já registrado
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Usuario Existente', userExistente);

    // Valida se a mensagem de alerta é exibida no formulário
    cy.get('.signup-form form p')
      .should('be.visible')
      .and('contain', 'Email Address already exist!');

    // 3. Efetua o login com a conta criada para realizar a exclusão ao final
    login.preencherLogin(userExistente, 'WebAutomacao123');
    login.excluirConta();
  });

  // =========================================================================
  // Módulo de Produtos e Pesquisa (Casos 8 e 9)
  // =========================================================================

  it('Caso 8: Verificar todos os produtos e detalhes do produto', () => {
    // Acessa a página de produtos
    produtos.navegarParaProdutos();

    // Valida se a lista de produtos está visível
    produtos.validarListaProdutosVisivel();

    // Clica no botão 'View Product' do primeiro item exibido
    produtos.visualizarDetalhesPrimeiroProduto();

    // Valida se as informações do produto estão visíveis
    produtos.validarInformacoesDetalhadaProduto();
  });

  it('Caso 9: Pesquisar produtos por nome', () => {
    // Acessa a página de produtos
    produtos.navegarParaProdutos();

    // Digita 'Dress' na barra de pesquisa e clica no botão com ícone de lupa
    produtos.pesquisarProduto('Dress');

    // Valida se o título aparece e se o produto filtrado é exibido
    produtos.validarResultadoPesquisa('Dress');
  });

  // =========================================================================
  // Módulo de Rodapé (Caso 10)
  // =========================================================================

  it('Caso 10: Verificar inscrição na página inicial', () => {
    // Rola a página até o rodapé e verifica se o título está visível
    rodape.rolarAteRodape();

    // Preenche um e-mail no campo de newsletter e clica na seta de envio
    rodape.preencherInscricaoNewsletter('user_subscription@teste.com');

    // Valida se a mensagem de confirmação é exibida corretamente
    rodape.validarMensagemInscricaoSucesso();
  });

  // =========================================================================
  // Módulo de Carrinho, Checkout e Compra (Casos 15 e 16)
  // =========================================================================

  it('Caso 15: Fazer pedido: Cadastrar antes do Checkout', () => {
    // E-mail exclusivo do teste de compra do caso 15 
    const emailDinamico = `user_checkout_${Date.now()}@teste.com`;

    // 1. Efetua o cadastro do usuário completo
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Marcela Checkout', emailDinamico);
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8', mes: 'May', ano: '1995',
      nome: 'Marcela', sobrenome: 'Checkout',
      endereco: 'Rua do Checkout, 500', pais: 'India',
      estado: 'AL', cidade: 'Maceió',
      zipcode: '90001', celular: '11666666666'
    });
    cadastro.validarContaCriada();

    // 2. Navega até os produtos e adiciona um item no carrinho
    produtos.navegarParaProdutos();
    carrinho.adicionarPrimeiroProdutoAoCarrinho();

    // 3. Vai até o Checkout e clica em 'Place Order' para ir à tela de pagamento
    carrinho.prosseguirParaCheckout();
    carrinho.clicarPlaceOrder();

    // 4. Preenche os dados do pagamento e confirma o pagamento
    carrinho.preencherDadosPagamento('Marcela Checkout', '4111111111111111', '311', '12', '2028');

    // 5. Valida a mensagem de pedido concluído com sucesso
    carrinho.validarPedidoConcluidoComSucesso();

    // 6. Exclui a conta criada ao final da execução
    login.excluirConta();
  });

  it('Caso 16: Fazer pedido: Fazer login antes do Checkout', () => {
    // E-mail exclusivo para o teste de compra do caso 16
    const emailDinamico = `user_login_checkout_${Date.now()}@teste.com`;

    // 1. Cria a conta e faz logout em seguida
    cy.get('a[href="/login"]').click();
    cadastro.iniciarCadastro('Marcela LoginCheckout', emailDinamico);
    cadastro.preencherFormularioCompleto({
      senha: 'WebAutomacao123',
      dia: '8', mes: 'May', ano: '1995',
      nome: 'Marcela', sobrenome: 'LoginCheckout',
      endereco: 'Rua Comercio, 800', pais: 'India',
      estado: 'AL', cidade: 'Maceió',
      zipcode: '90001', celular: '11555555555'
    });
    cadastro.validarContaCriada();
    login.efetuarLogout();

    // 2. Faz o login com a conta criada antes de iniciar a compra
    cy.get('a[href="/login"]').click();
    login.preencherLogin(emailDinamico, 'WebAutomacao123');

    // 3. Adiciona produto ao carrinho, vai até o checkout, clica em 'Place Order' e faz o pagamento
    produtos.navegarParaProdutos();
    carrinho.adicionarPrimeiroProdutoAoCarrinho();
    carrinho.prosseguirParaCheckout();
    carrinho.clicarPlaceOrder();
    carrinho.preencherDadosPagamento('Marcela LoginCheckout', '4111111111111111', '311', '12', '2028');

    // 4. Valida a mensagem de confirmação do pedido
    carrinho.validarPedidoConcluidoComSucesso();

    // 5. Apaga a conta para manter o banco limpo
    login.excluirConta();
  });

});
