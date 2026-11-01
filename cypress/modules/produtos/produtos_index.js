// Objeto com os seletores CSS da vitrine, pesquisa e detalhes de produtos
const seletores = {
  menuProdutos: 'a[href="/products"]',
  listaProdutos: '.features_items',
  botaoViewProductPrimeiroItem: '.features_items .col-sm-4 a[href^="/product_details"]',

  // Painel de informações detalhadas do produto
  painelDetalhesProduto: '.product-information',

  // Barra de pesquisa de produtos
  campoPesquisa: '#search_product',
  botaoPesquisa: '#submit_search',
  tituloPesquisa: '.title.text-center'
};

// Objeto 'produtos' exportado com as ações de navegação e busca de itens
export const produtos = {

  // Clica no link 'Products' no cabeçalho para navegar até a página de produtos
  navegarParaProdutos() {
    cy.get(seletores.menuProdutos).click();
  },

  // Confirma se o catálogo/lista de produtos está visível na tela
  validarListaProdutosVisivel() {
    cy.get(seletores.listaProdutos).should('be.visible');
  },

  // Clica no link 'View Product' do primeiro item exibido na lista
  visualizarDetalhesPrimeiroProduto() {
    cy.get(seletores.botaoViewProductPrimeiroItem).first().click();
  },

  // Valida se todas as informações do produto estão visíveis
  validarInformacoesDetalhadaProduto() {
    cy.get(seletores.painelDetalhesProduto).should('be.visible').within(() => {
      cy.get('h2').should('be.visible');             // Nome do produto
      cy.get('p').should('contain', 'Category');     // Categoria do produto
      cy.get('span span').should('be.visible');      // Preço do item
      cy.get('p').should('contain', 'Availability'); // Status de estoque
      cy.get('p').should('contain', 'Condition');    // Condição do produto
      cy.get('p').should('contain', 'Brand');        // Marca do fabricante
    });
  },

  // Digita a palavra-chave no campo de pesquisa e clica no botão de busca
  pesquisarProduto(nomeProduto) {
    cy.get(seletores.campoPesquisa).type(nomeProduto);
    cy.get(seletores.botaoPesquisa).click();
  },

  // Valida se o título de busca é exibido e se o produto pesquisado está na lista
  validarResultadoPesquisa(termoBuscado) {
    cy.get(seletores.tituloPesquisa)
      .should('be.visible')
      .and('contains.text', 'Searched Products'); // Valida o título do resultado

    cy.get(seletores.listaProdutos)
      .should('be.visible')
      .and('contain', termoBuscado); // Garante que o item buscado aparece no resultado
  }
};
