import 'cypress-mochawesome-reporter/register';

// Evita que erros internos da aplicação quebrem os testes do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
