# Boas Práticas em Cypress e pytest para Testes Automatizados

Este documento descreve práticas recomendadas para criar testes dinâmicos, escaláveis e confiáveis utilizando **Cypress** (JavaScript) e **pytest** (Python). Essas práticas ajudam a garantir que os testes sejam robustos, fáceis de manter e agreguem valor ao ciclo de desenvolvimento.

---

## 📋 **Boas Práticas em Cypress**

Consulte o arquivo `cypress.cy.js` para exemplos de boas práticas no Cypress.


1. **Use atributos de dados para selecionar elementos**  
   Evite selecionar elementos por classes ou IDs que possam mudar com frequência. Utilize atributos dedicados como `data-cy` ou `data-test-id`.

2. **Configure uma URL base**  
   Centralize a configuração da URL base no arquivo de configuração do Cypress para evitar redundância e facilitar alterações futuras.

3. **Evite `cy.wait` com valores fixos**  
   Substitua esperas fixas por interceptação de eventos ou requisições específicas para aumentar a confiabilidade dos testes.

4. **Garanta a independência dos testes**  
   Certifique-se de que cada teste pode ser executado isoladamente, inicializando o estado necessário no início.

5. **Controle o estado de forma programática**  
   Utilize APIs ou comandos dedicados para configurar o estado inicial, ao invés de depender de interações manuais ou fluxos longos.

6. **Evite apenas uma única asserção por teste**  
   Inclua múltiplas verificações significativas para garantir a validação de fluxos completos e evitar falsos positivos.

---

## 🐍 **Boas Práticas em pytest**

1. **Organize os testes de forma modular**  
   Estruture os testes em arquivos e pastas com nomes claros, separados por funcionalidade.

2. **Use fixtures para setups reutilizáveis**  
   Utilize fixtures para inicializar dados ou configurações compartilhadas entre diferentes testes.

3. **Separe testes longos e curtos**  
   Use marcadores para identificar testes que exigem mais tempo de execução e execute-os seletivamente conforme necessário.

4. **Evite números mágicos**  
   Substitua valores numéricos ou strings "mágicas" por variáveis bem nomeadas, melhorando a legibilidade.

5. **Configure pytest.ini ou pyproject.toml**  
   Centralize configurações de execução, como marcadores personalizados e comportamentos padrão.

6. **Mantenha mensagens de erro úteis**  
   Personalize mensagens de erro em asserções para facilitar a depuração e identificar rapidamente a causa de falhas.

---

## 🔑 **Práticas Comuns para Testes Automatizados**

- **Versionamento**: Mantenha os testes versionados com o código-fonte (ex.: Git).
- **Documentação**: Adicione descrições para cada teste e suas intenções.
- **Automação**: Integre os testes em pipelines de CI/CD para execução contínua.
- **Revisão Contínua**: Atualize os testes conforme o sistema evolui e introduza novos cenários.

---

### 📂 Estrutura dos Arquivos

- **`README.md`**: Este arquivo descrevendo as boas práticas.  
- **`cypress.cy.js`**: Exemplos práticos de boas práticas com Cypress.  
- **`pytest.py`**: Exemplos práticos de boas práticas com pytest.  

---

Com essas boas práticas, você estará criando uma base sólida para testes automatizados, garantindo maior qualidade e confiança no desenvolvimento de software. 🚀
