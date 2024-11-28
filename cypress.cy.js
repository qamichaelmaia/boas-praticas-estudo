// Boas práticas em Cypress

// 6 Boas Práticas do Cypress para tornar os Testes mais dinâmicos

// Escrever bons testes E2E pode ser mais difícil do que parece. É necessário definir as configurações corretas, maneiras eficientes de usar sua suíte de testes, decidir o que testar, o que não testar e como realizar os testes necessários. Aqui estão 6 práticas recomendadas que você pode seguir ao escrever seus testes para aproveitar ao máximo o Cypress. Na verdade, essas práticas podem ser aplicadas a qualquer framework de testes, não apenas ao Cypress.


// ✅ Use atributos de dados ao selecionar elementos:
cy.get('[data-cy="link"]');
cy.get('[data-test-id="link"]');

// ✅ Configure uma URL base:
cy.visit('https://webtips.dev/webtips/cypress');
cy.visit('webtips/cypress');


// ✅ Evite usar cy.wait com um número fixo:
cy.wait(5000); // Não recomendado

cy.intercept('POST', '/login').as('login');
cy.wait('@login'); // Aguarde explicitamente pela requisição

// ✅ Os testes devem ser capazes de passar de forma independente
// ✅ Controle o estado de forma programática
// ✅ Evite apenas uma única asserção



// 1. Use atributos de dados ao selecionar elementos
// Uma das práticas recomendadas mais importantes que você pode seguir ao criar seus testes E2E é escrever seletores completamente isolados de seu CSS ou JavaScript. Você deseja criar seletores que possam ser direcionados especificamente para fins de teste, para que nenhuma atualização de CSS ou JavaScript possa quebrar seu conjunto de testes, apenas porque um seletor foi alterado. A melhor opção aqui é usar custom data atributos:
// ✅ Faça
cy.get('[data-cy="link"]');
cy.get('[data-test-id="link"]');

// ❌ Não faça
cy.get('button');          // Muito genérico
cy.get('.button');         // Acoplado ao CSS
cy.get('#button');         // Acoplado ao JavaScript
cy.get('[type="submit"]'); // Acoplado ao HTML
//Eles descrevem claramente sua finalidade e você saberá que, se alterá-los, também precisará atualizar seus casos de teste.


// 2. Defina um URL base
// Definir um URL base globalmente também é uma ótima prática. Isso não apenas torna seus testes mais limpos, mas também facilita a alternância do conjunto de testes entre diferentes ambientes, como um host local e um site de produção.
// ✅ Faça
cy.visit('webtips/cypress');

// ❌ Não faça
cy.visit('https://webtips.dev/webtips/cypress');
cy.visit('http://localhost/webtips/cypress');
//Quando se trata de Cypress, isso também traz benefícios de desempenho. Por padrão, se você não definir uma URL base global, o Cypress tentará carregar em seu host local antes de mudar para o local final quando encontrar um cy.visit comando.


// 3. Evite usar cy.wait com um número
// Uma armadilha comum no Cypress é usar o cy.wait comando com um número fixo. Isso provavelmente acontece porque você deseja aguardar a exibição de um elemento ou a conclusão de uma solicitação de rede antes de continuar. Para evitar falhas aleatórias, você introduz cy.wait com um número arbitrário para garantir que os comandos terminaram de ser executados.

// O problema disso é que você acaba esperando mais do que o necessário. Se você usar cy.wait com 5.000 milissegundos para aguardar uma solicitação de rede, mas a solicitação termina em 500 milissegundos, você aumentou o tempo de execução do seu conjunto de testes em 4.500 milissegundos sem motivo.
// ✅ Faça
cy.intercept('POST', '/login').as('login');
cy.wait('@login'); // Aguarde explicitamente pela requisição

// ❌ Não faça
cy.wait(5000); // Uso de espera fixa (não recomendado)
//Em vez disso, use cy.wait com um alias para garantir que a condição que você está aguardando seja atendida, para que você possa prosseguir com segurança. Você também pode usar asserções no lugar de cy.wait para garantir que certas condições sejam atendidas antes de prosseguir.


// 4. Os testes devem ser aprovados de forma independente
// Outro erro comum que você pode cometer é criar testes acoplados e dependentes uns dos outros. Depender do estado de um teste anterior leva a um conjunto de testes frágil que pode quebrar o restante dos seus casos de teste se as condições iniciais não forem atendidas. Tomemos o seguinte como exemplo:
// ❌ Não faça
it('Deve fazer login do usuário', () => { ... });
it('Deve ser capaz de alterar as configurações', () => {
    cy.get('[data-cy="email"]').type('email@updated.com');
});

it('Deve mostrar as configurações atualizadas', () => {
    cy.contains('[data-cy="profile"]', 'email@updated.com');
});
// No exemplo de código acima, cada teste depende do anterior, o que significa que se um falhar, outros também falharão. Se você mudar as coisas no primeiro, provavelmente terá que atualizar o resto. Separe seus testes e combine várias etapas que dependem umas das outras em uma só ou crie um código compartilhado que você possa reutilizar.


// 5. Controle o estado programaticamente
// Sempre que você precisar definir o estado do seu aplicativo para poder testar nas condições corretas, sempre tente definir o estado programaticamente, em vez de usar a interface do usuário. Isso significa que seu estado será dissociado da IU. Você também verá uma melhoria no desempenho, pois definir o estado programaticamente é mais rápido do que usar a UI do seu aplicativo.
// ✅ Faça
cy.request('POST', '/login', {
    email: 'test@email.com',
    pass: 'testPass'
});

// ❌ Não faça
cy.get('[data-cy="email"]').type('test@email.com');
cy.get('[data-cy="pass"]').type('testPass');
cy.get('[data-cy="submit"]').click();
// No exemplo de código acima, podemos usar cy.request para se comunicar diretamente com uma API para fazer login de um usuário, em vez de usar a IU para fazer o mesmo. O mesmo se aplica a outras ações, como adicionar dados de teste ao seu aplicativo para colocá-lo no estado correto.


// 6. Evite afirmações únicas
// Por último, mas não menos importante, evite usar asserções únicas. Asserções únicas podem ser boas para testes unitários, mas aqui estamos escrevendo testes E2E. Mesmo que você não separe suas asserções em diferentes etapas de teste, você saberá exatamente qual asserção falhou.
// ✅ Faça
it('Deve ter um link externo apontando para o domínio correto', () => {
    cy.get('.link')
      .should('have.length', 1)
      .find('a')
      .should('contain', 'webtips.dev')
      .and('have.attr', 'target', '_blank');
});

// ❌ Não faça
it('Deve ter um link', () => {
    cy.get('.link')
      .should('have.length', 1)
      .find('a');
});

it('Deve conter o texto correto', () => {
    cy.get('.link').find('a').should('contain', 'webtips.dev');
});

it('Deve ser um link externo', () => {
    cy.get('.link').find('a').should('have.attr', 'target', '_blank');
});
// Mais importante ainda, o Cypress executa eventos de ciclo de vida entre seus testes que redefinem seu estado. Isso exige mais computação do que adicionar asserções a um único teste. Portanto, escrever asserções únicas pode ter um impacto negativo no desempenho do seu conjunto de testes.