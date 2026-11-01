// Objeto com os seletores CSS da seção de rodapé da página
const seletores = {
  rodape: '#footer',
  tituloSubscription: '.single-widget h2',
  campoEmailSubscription: '#susbscribe_email',
  botaoSubscription: '#subscribe',
  mensagemSucesso: '.alert-success'
};

// Objeto 'rodape' exportado com as ações da newsletter
export const rodape = {

  // Rola a tela até a parte inferior e confirma a presença da seção 'Subscription'
  rolarAteRodape() {
    cy.get(seletores.rodape).scrollIntoView(); // Faz a rolagem suave até o elemento
    cy.get(seletores.tituloSubscription)
      .should('be.visible')
      .and('contain', 'Subscription');
  },

  // Digita o e-mail no campo de inscrição e clica na seta de envio da newsletter
  preencherInscricaoNewsletter(email) {
    cy.get(seletores.campoEmailSubscription).type(email);
    cy.get(seletores.botaoSubscription).click();
  },

  // Valida a exibição do alerta verde de confirmação da inscrição
  validarMensagemInscricaoSucesso() {
    cy.get(seletores.mensagemSucesso)
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  }
};
