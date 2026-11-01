# Automação Web - Trabalho de Conclusão

Testes automatizados end-to-end do site [Automation Exercise](https://www.automationexercise.com), feitos com Cypress.

## Tecnologias
- Cypress
- cypress-mochawesome-reporter (relatório HTML)
- GitHub Actions (execução na esteira)

## Como executar
Instale as dependências:

```bash
npm install
```

Rode os testes em modo headless:

```bash
npm run web:run
```

Ou abra a interface do Cypress:

```bash
npm run web:open
```

## Relatório
Ao final da execução, o relatório fica em `cypress/reports/index.html`.

## Integração contínua
Os testes rodam no GitHub Actions a cada push ou pull request na branch `main`.
Também é possível executar manualmente em **Actions → Esteira de Testes Automatizados Web → Run workflow**.
O relatório fica disponível para download em **Artifacts**, na página de cada execução.

## Cenários cobertos
- Caso 1: Cadastrar usuário e excluir a conta
- Caso 2: Login com e-mail e senha corretos
- Caso 3: Login com e-mail e senha inválidos
- Caso 4: Logout
- Caso 5: Cadastro com e-mail já existente
- Caso 8: Todos os produtos e detalhes do produto
- Caso 9: Pesquisa de produtos por nome
- Caso 10: Inscrição na página inicial
- Caso 15: Pedido cadastrando antes do checkout
- Caso 16: Pedido com login antes do checkout

