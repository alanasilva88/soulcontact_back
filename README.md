# Agenda de Contatos API

Esta é uma API desenvolvida em Node.js para gerenciar uma agenda de contatos, onde é possível cadastrar usuários e seus respectivos contatos através de rotas HTTP.

## Dependências

Certifique-se de ter as seguintes dependências instaladas:

- **nodemon**: Utilizado para reiniciar automaticamente o servidor durante o desenvolvimento.
- **dotenv**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **joi**: Para validação de dados no Node.js.
- **mongoose**: ODM (Object Data Modeling) para MongoDB.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   
2. Instale as dependências:
   ```bash
   npm install
   
3.Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
* Substitua sua-url-de-conexao-com-o-mongodb pela URL de conexão do seu banco de dados MongoDB.
  ```bash
  PORT=3000
  MONGODB_URI=sua-url-de-conexao-com-o-mongodb

4.Inicie o servidor:

Execute o comando 'npm start' para iniciar o servidor.

## Uso
Após iniciar o servidor, a API estará disponível na porta definida no arquivo .env. Por padrão, será http://localhost:3000. Agora você pode utilizar ferramentas como Postman ou cURL para testar as rotas da API.

## Endpoints
Aqui estão alguns dos principais endpoints disponíveis na API:

* POST /users: Cria um novo usuário.
* GET /users: Retorna a lista de todos os usuários.
* POST /contacts: Adiciona um novo contato para um usuário específico.
* GET /contacts: Retorna a lista de contatos de um usuário.










