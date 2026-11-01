// Objeto que mapeia os seletores CSS do Carrinho, Checkout e Pagamento por Cartão
const seletores = {
  // Adição ao carrinho
  botaoAdicionarAoCarrinho: '.add-to-cart',
  modalSucessoAdicao: '#cartModal',
  linkVerCarrinhoModal: '#cartModal u',
  menuCarrinho: 'header a[href="/view_cart"]',

  // Processo de Checkout e Pagamento
  botaoProceedToCheckout: '.btn.btn-default.check_out',
  botaoPlaceOrder: 'a[href="/payment"]', // Botão 'Place Order' para ir à tela de pagamento

  // Campos do Formulário de Pagamento por Cartão de Crédito
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvcCartao: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagarEConfirmar: '[data-qa="pay-button"]',

  // Tela de Sucesso da Compra
  mensagemSucessoPedido: '[data-qa="order-placed"]'
};

// Objeto 'carrinho' exportado com todas as funções do fluxo de compra
export const carrinho = {

  // Adiciona o primeiro produto da vitrine ao carrinho e navega até o carrinho pelo modal
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get(seletores.botaoAdicionarAoCarrinho).first().click(); // Clica em 'Add to cart' do 1º item
    cy.get(seletores.modalSucessoAdicao).should('be.visible');   // Confirma abertura do modal
    cy.get(seletores.linkVerCarrinhoModal).click();              // Clica no link 'View Cart'
  },

  // Acessa a página do carrinho utilizando a opção do menu superior
  irParaCarrinho() {
    cy.get(seletores.menuCarrinho).click();
  },

  // Avança da página do carrinho (/view_cart) para a página de Checkout (/checkout)
  prosseguirParaCheckout() {
    cy.get(seletores.botaoProceedToCheckout).click();
  },

  // Clica no botão 'Place Order' na tela de Checkout para ir para a tela de Pagamento (/payment)
  clicarPlaceOrder() {
    cy.get(seletores.botaoPlaceOrder).click();
  },

  // Preenche todos os campos do formulário de pagamento com cartão e confirma a transação
  preencherDadosPagamento(nome, numero, cvc, mes, ano) {
    cy.get(seletores.nomeCartao).type(nome);        // Nome impresso no cartão
    cy.get(seletores.numeroCartao).type(numero);    // Número do cartão
    cy.get(seletores.cvcCartao).type(cvc);          // Código CVC
    cy.get(seletores.mesExpiracao).type(mes);       // Mês de expiração
    cy.get(seletores.anoExpiracao).type(ano);       // Ano de expiração
    cy.get(seletores.botaoPagarEConfirmar).click(); // Clica no botão 'Pay and Confirm Order'
  },

  // Valida a mensagem de confirmação do pedido realizado ("ORDER PLACED!")
  validarPedidoConcluidoComSucesso() {
    cy.get(seletores.mensagemSucessoPedido)
      .should('be.visible')
      .and('contains.text', 'Order Placed'); // Confirma que o pedido foi processado
  }
};
