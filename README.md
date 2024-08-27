## Como executar o projeto?

- Opcional: utilizar o docker.
- Caso opte por utilizar o docker-compose da aplicação, execute o comando: docker compose up -d, isso fará com que os serviços do docker sejam executados.
- Com os serviços do docker funcionando, você tera o postgres e o pg admin para a vizualização do banco de dados. (Existe tambem a possibilidade de utilizar o prisma studio, mas não me agrada muito.)
- Execute o comando `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres`
- Deve retornar um IP, algo assim: `172.19.0.2`, Esse é o host do seu banco de dados.
- Agora no .env.example tem um exemplo de URL, preencha com as informações necessarias e podemos executar o projeto

  - URL segundo docker: "postgresql://ag_user:ag_password@172.19.0.2:5432/ag_db?schema=public"

- instala as dependências: `yarn` || `npm install`

- comando: yarn||npx prisma generate
- Após isso podemos executar o projeto com ou sem build
  - Com Build: `yarn build` || `npm run build` && `yarn start` || `npm run start`
  - Sem Build: `yarn dev` || `npm run dev` 

## Endpoint da aplicação:

### Tem um documento exportado do insomnia com todas as rotas testaveis

`POST /api/agriculture`

- **Descrição**: Cria um novo registro de fazenda.
- **Corpo da Requisição**:

  - {
    "nome": "Amazon",
    "nome_fazenda": "Fazenda Prime",
    "documento": "13.347.016/0001-17",
    "cidade": "Belo Horizonte",
    "estado": "MG",
    "area_fazenda": 600,
    "area_agricutaravel": 400,
    "area_vegetacao": 400,
    "plantacoes": ["Milho", "Soja", "Cana-de-açúcar"]
    }

- **Respostas**:
  - `201 Created`: Registro criado com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture`

- **Descrição**: Retorna uma lista paginada de fazendas.
- **Query Params**:
  - `page` (number): Página a ser retornada (padrão: 1).
  - `quantity` (number): Número de registros por página (padrão: 10).
- **Respostas**:
  - `200 OK`: Lista de fazendas retornada com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture/:id`

- **Descrição**: Retorna os detalhes de uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Respostas**:
  - `200 OK`: Detalhes da fazenda retornados com sucesso.
  - `404 Not Found`: Fazenda não encontrada.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture/document`

- **Descrição**: Retorna o documento de uma fazenda específica.
- **Query Params**:
  - `document` (string): Documento a ser buscado (em formato JSON).
  - `page` (number): Página a ser retornada (padrão: 1).
  - `quantity` (number): Número de registros por página (padrão: 10).
- **Respostas**:
  - `200 OK`: Documento retornado com sucesso.
  - `404 Not Found`: Documento não encontrado
  - `500 Internal Server Error`: Erro no servidor.

#

`PUT /api/agriculture/:id`

- **Descrição**: Atualiza os dados de uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Corpo da Requisição**:

  - {
    "nome": "Amazon",
    "nome_fazenda": "Fazenda Prime",
    "documento": "13.347.016/0001-17",
    "cidade": "Belo Horizonte",
    "estado": "MG",
    "area_fazenda": 600,
    "area_agricutaravel": 400,
    "area_vegetacao": 400,
    "plantacoes": ["Milho", "Soja", "Cana-de-açúcar"]
    }

- **Respostas**:
  - `200 OK`: Fazenda atualizada com sucesso.
  - `404 Not Found`: Documento não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#

`DELETE /api/agriculture/:id`

- **Descrição**: Exclui uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Respostas**:
  - `204 No Content`: Fazenda excluída com sucesso.
  - `404 Not Found`: Documento não encontrado.
  - `500 Internal Server Error`: Erro no servidor.
