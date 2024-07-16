# BookDatabaseManager-exercise

## Descrição
BookDatabaseManager-exercise é um projeto desenvolvido como parte de uma tarefa da faculdade com o objetivo principal de treinar a criação de uma REST API. Este projeto permite a manipulação de registros de livros em um banco de dados MySQL através de endpoints específicos.

## Funcionalidades
O projeto oferece os seguintes endpoints:
- `POST /books`: Insere um novo livro no banco de dados.
- `GET /books`: Recupera todos os livros do banco de dados.
- `GET /books/:id`: Recupera um livro específico pelo seu ISBN.
- `PUT /books/:id`: Atualiza os dados de um livro específico pelo seu ISBN.
- `DELETE /books/:id`: Deleta um livro específico pelo seu ISBN.

## Tecnologias Utilizadas
- **MySQL**: Banco de dados relacional para armazenamento dos registros dos livros.
- **Express**: Framework web para Node.js utilizado para a criação dos endpoints da API.
- **TypeScript**: Linguagem utilizada para adicionar tipagem estática ao JavaScript.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
